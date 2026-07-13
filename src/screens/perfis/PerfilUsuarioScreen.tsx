import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { PlayIcon, VerifiedIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Perfis'>;

const TABS = ['Timeline', 'Fotos', 'Vídeos', 'Conquistas', 'Estatísticas', 'Coleções', 'Sobre'];

const SUGESTOES = ['Ana Ferraz', 'Carlos Melo', 'Julia Prado'];

const CONQUISTAS = [
  { titulo: 'Primeira trilha completa', data: 'Há 2 meses' },
  { titulo: '10 memórias registradas', data: 'Há 1 mês' },
  { titulo: 'Selo de dedicação', data: 'Há 3 semanas' },
  { titulo: 'Primeira competição', data: 'Há 5 dias' },
];

const ESTATISTICAS = [
  { label: 'Treinos por mês', value: '12', pct: '78%', color: theme.colors.accent.olive },
  { label: 'Horas montadas', value: '34h', pct: '60%', color: theme.colors.accent.leather },
  { label: 'Distância percorrida', value: '96km', pct: '45%', color: theme.colors.accent.gold },
] as const;

const COLECOES = [
  { titulo: 'Primeiras competições', qtd: '8 fotos' },
  { titulo: 'Trilhas', qtd: '23 fotos' },
  { titulo: 'Pôr do sol', qtd: '6 fotos' },
];

export function PerfilUsuarioScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const horses = useHorseStore((state) => state.horses);
  const [tab, setTab] = useState('Timeline');
  const { message, show } = useToast();

  const cavaloPrincipal = horses[0]?.nome || 'seu cavalo';
  const local = [profile.cidade, profile.estado].filter(Boolean).join(', ');
  const localModalidade = [local, profile.modalidadePrincipal].filter(Boolean).join(' · ');

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ImagePlaceholder caption={`foto · ${profile.nome || 'Mauro'} com ${cavaloPrincipal}`} style={StyleSheet.absoluteFill} />
          <View style={styles.heroOverlay} />
        </View>

        <View style={styles.body}>
          <View style={styles.headerRow}>
            <View style={styles.avatar} />
            <View style={styles.headerText}>
              <View style={styles.nameRow}>
                <Text variant="lg" weight="extraBold">
                  {profile.nome || 'Seu nome'}
                </Text>
                <VerifiedIcon />
              </View>
              {!!localModalidade && (
                <Text variant="xs" weight="semiBold" color="secondary" style={styles.nameSubtitle}>
                  {localModalidade}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                Nível {profile.nivel || 'não definido'}
              </Text>
            </View>
            <View style={[styles.badge, styles.badgeNeutral]}>
              <Text variant="xs" weight="bold">
                Membro EquiSoul
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.primaryAction} onPress={() => navigation.navigate('EditarPerfil')}>
              <Text variant="sm" weight="extraBold">
                Editar perfil
              </Text>
            </Pressable>
            <Pressable style={styles.secondaryAction} onPress={() => show('Link copiado!')}>
              <Text variant="sm" weight="bold">
                Compartilhar
              </Text>
            </Pressable>
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text variant="lg" weight="extraBold">
                {horses.length}
              </Text>
              <Text variant="xs" weight="bold" color="secondary" style={styles.statLabel}>
                CAVALOS
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="lg" weight="extraBold">
                128
              </Text>
              <Text variant="xs" weight="bold" color="secondary" style={styles.statLabel}>
                SEGUIDORES
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="lg" weight="extraBold">
                96
              </Text>
              <Text variant="xs" weight="bold" color="secondary" style={styles.statLabel}>
                SEGUINDO
              </Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            <View style={styles.tabsRow}>
              {TABS.map((label) => (
                <Chip key={label} label={label} selected={tab === label} onPress={() => setTab(label)} />
              ))}
            </View>
          </ScrollView>

          {tab === 'Timeline' && (
            <View style={styles.timelineTab}>
              <Pressable style={styles.listCard} onPress={() => navigation.navigate('Cavalos')}>
                <View style={styles.listCardThumb} />
                <View>
                  <Text variant="md" weight="bold">
                    Meus cavalos
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.listCardSubtitle}>
                    {horses.length} cavalo{horses.length === 1 ? '' : 's'} cadastrado{horses.length === 1 ? '' : 's'}
                  </Text>
                </View>
              </Pressable>
              <View style={styles.listCard}>
                <View style={styles.listCardThumb} />
                <View>
                  <Text variant="md" weight="bold">
                    Coleções
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.listCardSubtitle}>
                    Primeiras competições, Trilhas, Pôr do sol
                  </Text>
                </View>
              </View>

              <Text variant="xs" weight="bold" style={styles.sectionLabel}>
                PESSOAS PARECIDAS COM VOCÊ
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.sugestoesRow}>
                  {SUGESTOES.map((nome) => (
                    <Pressable key={nome} style={styles.sugestaoItem} onPress={() => navigation.navigate('PerfilPublico')}>
                      <View style={styles.sugestaoAvatar} />
                      <Text variant="xs" weight="semiBold" color="secondary" style={styles.sugestaoNome}>
                        {nome}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {tab === 'Fotos' && (
            <View style={styles.grid}>
              {Array.from({ length: 9 }, (_, i) => (
                <View key={i} style={styles.gridTile} />
              ))}
            </View>
          )}

          {tab === 'Vídeos' && (
            <View style={styles.grid}>
              {Array.from({ length: 6 }, (_, i) => (
                <View key={i} style={styles.gridTile}>
                  <View style={styles.playBadge}>
                    <PlayIcon />
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === 'Conquistas' && (
            <View style={styles.conquistasTab}>
              {CONQUISTAS.map((item) => (
                <View key={item.titulo} style={styles.conquistaCard}>
                  <View style={styles.conquistaIcon} />
                  <View>
                    <Text variant="md" weight="bold">
                      {item.titulo}
                    </Text>
                    <Text variant="xs" weight="medium" color="secondary" style={styles.listCardSubtitle}>
                      {item.data}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === 'Estatísticas' && (
            <View style={styles.statsTab}>
              {ESTATISTICAS.map((item) => (
                <View key={item.label}>
                  <View style={styles.statsRow}>
                    <Text variant="sm" weight="bold">
                      {item.label}
                    </Text>
                    <Text variant="sm" weight="bold" color="secondary">
                      {item.value}
                    </Text>
                  </View>
                  <View style={styles.statsTrack}>
                    <View style={[styles.statsFill, { width: item.pct, backgroundColor: item.color }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === 'Coleções' && (
            <View style={styles.conquistasTab}>
              {COLECOES.map((item) => (
                <View key={item.titulo} style={styles.listCard}>
                  <View style={styles.listCardThumb} />
                  <View>
                    <Text variant="md" weight="bold">
                      {item.titulo}
                    </Text>
                    <Text variant="xs" weight="medium" color="secondary" style={styles.listCardSubtitle}>
                      {item.qtd}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === 'Sobre' && (
            <View style={styles.sobreTab}>
              <Text variant="sm" weight="semiBold" style={styles.sobreQuote}>
                {profile.bio ? `"${profile.bio}"` : 'Ainda não escreveu uma biografia.'}
              </Text>
              <View style={styles.sobreRow}>
                <Text variant="sm" weight="bold" color="secondary">
                  Localização
                </Text>
                <Text variant="sm" weight="bold">
                  {local || '—'}
                </Text>
              </View>
              <View style={styles.sobreRow}>
                <Text variant="sm" weight="bold" color="secondary">
                  Modalidade
                </Text>
                <Text variant="sm" weight="bold">
                  {profile.modalidadePrincipal || '—'}
                </Text>
              </View>
              <View style={styles.sobreRow}>
                <Text variant="sm" weight="bold" color="secondary">
                  Membro desde
                </Text>
                <Text variant="sm" weight="bold">
                  2026
                </Text>
              </View>
              <View style={styles.sobreRow}>
                <Text variant="sm" weight="bold" color="secondary">
                  Cavalos
                </Text>
                <Text variant="sm" weight="bold">
                  {horses.length ? horses.map((h) => h.nome || 'Sem nome').join(', ') : '—'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />
      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 150,
  },
  hero: {
    height: 280,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.35)',
  },
  body: {
    paddingHorizontal: theme.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.md,
    marginTop: -40,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.placeholder.background,
  },
  headerText: {
    paddingBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  nameSubtitle: {
    marginTop: 2,
  },
  badges: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  badgeNeutral: {
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  actions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryAction: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryAction: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    marginTop: 2,
    textTransform: 'uppercase',
  },
  tabsScroll: {
    marginTop: theme.spacing.xl,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  timelineTab: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  listCardThumb: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  listCardSubtitle: {
    marginTop: 2,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sugestoesRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  sugestaoItem: {
    alignItems: 'center',
    gap: 6,
    width: 76,
  },
  sugestaoAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.placeholder.background,
  },
  sugestaoNome: {
    textAlign: 'center',
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  gridTile: {
    width: '31.5%',
    height: 110,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conquistasTab: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  conquistaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.max,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  conquistaIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(201,161,90,0.15)',
  },
  statsTab: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsTrack: {
    marginTop: 6,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  statsFill: {
    height: '100%',
    borderRadius: 4,
  },
  sobreTab: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  sobreQuote: {
    fontStyle: 'italic',
    lineHeight: 22,
  },
  sobreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BellIcon, CalendarIcon, SearchIcon, StoreIcon, TrophyIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { getHorseAgeYears, useHorseStore } from '../../store/useHorseStore';
import { useMemoriesStore } from '../../store/useMemoriesStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const QUICK_ACTIONS = [
  'Treino',
  'Passeio',
  'Competição',
  'Foto',
  'Vídeo',
  'Áudio',
  'Check-in',
  'Memória',
  'Post',
];

const COMUNIDADE_PREVIEW = [
  { nome: 'Ana', texto: 'publicou um novo salto' },
  { nome: 'Carlos', texto: 'ganhou uma competição' },
];

export function DashboardHomeScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const horse = useHorseStore((state) => state.horses[0] ?? null);
  const memorias = useMemoriesStore((state) => state.memorias);

  const [iaExpandido, setIaExpandido] = useState(false);
  const [iaCartaGerada, setIaCartaGerada] = useState(false);

  const horseAge = horse?.nascimento ? getHorseAgeYears(horse.nascimento) : null;
  const horseNome = horse?.nome || 'seu cavalo';
  const tempoJuntos = horse?.relationship?.tempoJuntos;

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.headerText}>
            <Text variant="lg" weight="extraBold">
              Bom dia, {profile.nome || 'Mauro'}.
            </Text>
            <Text variant="sm" weight="medium" color="secondary">
              Hoje é um ótimo dia para criar novas memórias.
            </Text>
          </View>
          <Pressable style={styles.headerIcon} onPress={() => navigation.navigate('PesquisaMemorias')}>
            <SearchIcon />
          </Pressable>
          <Pressable style={styles.headerIcon} onPress={() => navigation.navigate('AgendaDashboard')}>
            <CalendarIcon />
          </Pressable>
          <Pressable
            accessibilityLabel="Marketplace"
            style={styles.headerIcon}
            onPress={() => navigation.navigate('MarketplaceHome')}
          >
            <StoreIcon />
          </Pressable>
          <Pressable
            accessibilityLabel="Centro de evolução"
            style={styles.headerIcon}
            onPress={() => navigation.navigate('GamificacaoHub')}
          >
            <TrophyIcon size={20} />
          </Pressable>
          <Pressable style={styles.headerIcon} onPress={() => navigation.navigate('Notificacoes')}>
            <BellIcon />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <ImagePlaceholder style={StyleSheet.absoluteFill} caption="foto grande · Bela em primeiro plano" />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text variant="xl" weight="extraBold" color="inverse">
              {horseNome}
              {horseAge !== null ? ` · ${horseAge} anos` : ''}
            </Text>
            <Text variant="sm" weight="bold" color="rgba(251,249,244,0.85)" style={styles.heroSubtitle}>
              Humor: tranquila · último treino há 2 dias
              {tempoJuntos ? ` · ${tempoJuntos}` : ''}
            </Text>
            <View style={styles.heroActions}>
              <Pressable style={styles.heroSecondaryButton} onPress={() => navigation.navigate('Perfis')}>
                <Text variant="sm" weight="bold" color="inverse">
                  Ver perfil
                </Text>
              </Pressable>
              <Pressable
                style={styles.heroPrimaryButton}
                onPress={() => navigation.navigate('NovoRegistro')}
              >
                <Text variant="sm" weight="extraBold">
                  Registrar memória
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.iaCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.iaEyebrow}>
            PERCEBIDO PELA IA
          </Text>
          <Text variant="md" weight="bold" color="inverse" style={styles.iaText}>
            Vocês têm montado com mais frequência pela manhã — e esses treinos terminam com registros
            mais positivos.
          </Text>
          {iaExpandido && (
            <Text variant="sm" weight="medium" color="rgba(251,249,244,0.8)" style={styles.iaExpanded}>
              Nos últimos 30 dias, 8 de 10 treinos matinais tiveram sentimento "feliz" ou "grato"
              registrado, contra 3 de 9 treinos à tarde.
            </Text>
          )}
          {iaCartaGerada && (
            <View style={styles.iaCartaBadge}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                Carta gerada — veja em "Memórias" na sua próxima visita.
              </Text>
            </View>
          )}
          <View style={styles.iaActions}>
            <Pressable onPress={() => setIaExpandido((current) => !current)}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.gold}>
                {iaExpandido ? 'Ler menos' : 'Ler mais'}
              </Text>
            </Pressable>
            <Pressable onPress={() => setIaCartaGerada(true)}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.gold}>
                Gerar carta
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('InteligenciaArtificial')}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.gold}>
                Ver mais IA
              </Text>
            </Pressable>
          </View>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          AÇÕES RÁPIDAS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
          {QUICK_ACTIONS.map((label) => (
            <Pressable
              key={label}
              style={styles.quickAction}
              onPress={() => navigation.navigate('NovoRegistro', { tipoInicial: label })}
            >
              <View style={styles.quickActionIcon} />
              <Text variant="xs" weight="semiBold" color="secondary">
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text variant="xs" weight="bold" style={styles.sectionLabelInline}>
            LINHA DO TEMPO
          </Text>
          <Pressable onPress={() => navigation.navigate('Timeline')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              Ver tudo
            </Text>
          </Pressable>
        </View>
        <View style={styles.timelineList}>
          {memorias.slice(0, 2).map((memoria) => (
            <Pressable
              key={memoria.id}
              style={styles.timelineCard}
              onPress={() => navigation.navigate('MemoriaCompleta', { id: memoria.id })}
            >
              <View style={styles.timelineThumb} />
              <View style={styles.timelineText}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                  {memoria.relativeLabel}
                </Text>
                <Text variant="md" weight="bold" style={styles.timelineTitle}>
                  {memoria.titulo}
                </Text>
                {!!memoria.subtitulo && (
                  <Text variant="sm" weight="medium" color="secondary" style={styles.timelineSubtitle}>
                    {memoria.subtitulo}
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          OBJETIVOS DA SEMANA
        </Text>
        <View style={styles.goals}>
          <View>
            <View style={styles.goalRow}>
              <Text variant="sm" weight="bold">
                Registrar três treinos
              </Text>
              <Text variant="sm" weight="bold" color="secondary">
                2/3
              </Text>
            </View>
            <View style={styles.goalTrack}>
              <View style={[styles.goalFill, { width: '66%' }]} />
            </View>
          </View>
          <View>
            <View style={styles.goalRow}>
              <Text variant="sm" weight="bold">
                Completar uma trilha
              </Text>
              <Text variant="sm" weight="bold" color="secondary">
                0/1
              </Text>
            </View>
            <View style={styles.goalTrack}>
              <View style={[styles.goalFill, { width: '0%' }]} />
            </View>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text variant="xs" weight="bold" style={styles.sectionLabelInline}>
            COMUNIDADE
          </Text>
          <Pressable onPress={() => navigation.navigate('Comunidade')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              Ver tudo
            </Text>
          </Pressable>
        </View>
        <View style={styles.comunidadeList}>
          {COMUNIDADE_PREVIEW.map((item) => (
            <Pressable
              key={item.nome}
              style={styles.comunidadeRow}
              onPress={() => navigation.navigate('Comunidade')}
            >
              <View style={styles.comunidadeAvatar} />
              <Text variant="sm" weight="medium" color="secondary">
                <Text variant="sm" weight="bold">
                  {item.nome}
                </Text>{' '}
                {item.texto}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="Home" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 130,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.placeholder.background,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  headerIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    marginTop: theme.spacing.lg,
    height: 320,
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(43,41,36,0.55)',
  },
  heroContent: {
    position: 'absolute',
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
  },
  heroSubtitle: {
    marginTop: theme.spacing.xs,
  },
  heroActions: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  heroSecondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: 'rgba(251,249,244,0.4)',
    backgroundColor: 'rgba(251,249,244,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPrimaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iaCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceDark,
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: theme.spacing.sm,
  },
  iaExpanded: {
    marginTop: theme.spacing.sm,
  },
  iaCartaBadge: {
    marginTop: theme.spacing.sm,
    borderRadius: 12,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: 'rgba(201,161,90,0.16)',
    alignSelf: 'flex-start',
  },
  iaActions: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionHeaderRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionLabelInline: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  quickActions: {
    marginTop: theme.spacing.sm,
  },
  quickAction: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginRight: theme.spacing.lg,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  timelineList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  timelineCard: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  timelineThumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  timelineText: {
    flex: 1,
    minWidth: 0,
  },
  timelineTitle: {
    marginTop: 2,
  },
  timelineSubtitle: {
    marginTop: 2,
  },
  goals: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalTrack: {
    marginTop: theme.spacing.xs,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  goalFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.accent.olive,
  },
  comunidadeList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  comunidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  comunidadeAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.placeholder.background,
  },
});

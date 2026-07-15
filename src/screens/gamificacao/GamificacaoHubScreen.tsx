import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentType } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import {
  BackIcon,
  CalendarIcon,
  CameraIcon,
  DiaryIcon,
  FlameIcon,
  HeartIcon,
  MountainIcon,
  RouteIcon,
  ShieldIcon,
  StoreIcon,
  TargetIcon,
} from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useUserStore } from '../../store/useUserStore';
import {
  CONQUISTAS_CATALOG,
  ConquistaIcon,
  MISSOES_CATALOG,
  getNivelInfo,
  useConquistaContext,
  useGamificationStore,
} from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoHub'>;

type IconComponent = ComponentType<{ size?: number; color?: string }>;

const ICON_BY_KEY: Record<ConquistaIcon, IconComponent> = {
  livro: DiaryIcon,
  montanha: MountainIcon,
  taca: MountainIcon,
  coracao: HeartIcon,
  camera: CameraIcon,
  calendario: CalendarIcon,
  escudo: ShieldIcon,
};

type MenuRoute =
  | 'GamificacaoJornadas'
  | 'GamificacaoSelos'
  | 'GamificacaoLoja'
  | 'GamificacaoRanking'
  | 'GamificacaoTemporadas'
  | 'GamificacaoObjetivos';

const MENU_ITENS: { label: string; route: MenuRoute; Icon: IconComponent }[] = [
  { label: 'Jornadas', route: 'GamificacaoJornadas', Icon: RouteIcon },
  { label: 'Selos', route: 'GamificacaoSelos', Icon: ShieldIcon },
  { label: 'Loja', route: 'GamificacaoLoja', Icon: StoreIcon },
  { label: 'Ranking', route: 'GamificacaoRanking', Icon: MountainIcon },
  { label: 'Temporadas', route: 'GamificacaoTemporadas', Icon: CalendarIcon },
  { label: 'Objetivos', route: 'GamificacaoObjetivos', Icon: TargetIcon },
];

export function GamificacaoHubScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const horse = useHorseStore((state) => state.horses[0] ?? null);
  const nomeCavalo = horse?.nome || 'seu cavalo';

  const xp = useGamificationStore((state) => state.xp);
  const streakDias = useGamificationStore((state) => state.streakDias);
  const desafiosParticipando = useGamificationStore((state) => state.desafiosParticipando);
  const missoesFeitas = useGamificationStore((state) => state.missoesFeitas);
  const ctx = useConquistaContext();

  const nivelInfo = getNivelInfo(xp);
  const conquistasDesbloqueadas = CONQUISTAS_CATALOG.filter((c) => c.isUnlocked(ctx)).slice(0, 4);
  const missoesPendentes = MISSOES_CATALOG.filter((m) => !missoesFeitas.includes(m.id)).slice(0, 2);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text variant="xxl" weight="extraBold">
            Centro de evolução
          </Text>
          <Pressable
            accessibilityLabel="Voltar"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={8}
          >
            <BackIcon size={16} />
          </Pressable>
        </View>

        <View style={styles.levelCard}>
          <View style={styles.levelGlow} />
          <View style={styles.avatarRing}>
            <View style={styles.avatarInner} />
          </View>
          <Text variant="lg" weight="extraBold" color="inverse" style={styles.userName}>
            {profile.nome || 'Você'}
          </Text>
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.levelLabel}>
            Nível {nivelInfo.nivel} · {nivelInfo.nome}
          </Text>
          <View style={styles.xpTrack}>
            <View style={[styles.xpFill, { width: `${nivelInfo.percent}%` }]} />
          </View>
          <Text variant="xs" weight="semiBold" color="rgba(251,249,244,0.65)" style={styles.xpLabel}>
            {nivelInfo.maxNivel
              ? `${nivelInfo.xpAtual} XP · nível máximo`
              : `${nivelInfo.xpAtual} / ${nivelInfo.xpProximo} XP para ${nivelInfo.proximoNome}`}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <Pressable style={styles.statCard} onPress={() => navigation.navigate('GamificacaoDesafios')}>
            <ShieldIcon size={20} />
            <Text variant="xl" weight="extraBold" style={styles.statValue}>
              {desafiosParticipando.length}
            </Text>
            <Text variant="sm" weight="semiBold" color="secondary">
              Desafios ativos
            </Text>
          </Pressable>
          <Pressable style={styles.statCard} onPress={() => navigation.navigate('GamificacaoStreak')}>
            <FlameIcon size={20} />
            <Text variant="xl" weight="extraBold" style={styles.statValue}>
              {streakDias} dias
            </Text>
            <Text variant="sm" weight="semiBold" color="secondary">
              Sequência atual
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text variant="xs" weight="bold" color="primary" style={styles.sectionTitle}>
            CONQUISTAS RECENTES
          </Text>
          <Pressable onPress={() => navigation.navigate('GamificacaoConquistas')}>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              ver todas
            </Text>
          </Pressable>
        </View>

        {conquistasDesbloqueadas.length === 0 ? (
          <View style={styles.emptyCard}>
            <MountainIcon size={22} color={theme.colors.text.tertiary} />
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.emptyText}>
              Suas primeiras conquistas com {nomeCavalo} vão aparecer aqui.
            </Text>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.conquistasRow}>
            {conquistasDesbloqueadas.map((c) => {
              const Icon = ICON_BY_KEY[c.icon];
              return (
                <Pressable
                  key={c.id}
                  style={styles.conquistaItem}
                  onPress={() => navigation.navigate('GamificacaoConquistas')}
                >
                  <View style={styles.conquistaIconWrap}>
                    <Icon size={26} color={theme.colors.accent.leather} />
                  </View>
                  <Text variant="xs" weight="bold" style={styles.conquistaLabel} numberOfLines={2}>
                    {c.nome}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <Text variant="xs" weight="bold" color="primary" style={[styles.sectionTitle, styles.missoesTitle]}>
          MISSÕES DE HOJE
        </Text>
        <View style={styles.missoesList}>
          {missoesPendentes.length === 0 ? (
            <Text variant="sm" weight="semiBold" color="secondary">
              Todas as missões de hoje concluídas. Você é incrível!
            </Text>
          ) : (
            missoesPendentes.map((m) => (
              <Pressable
                key={m.id}
                style={styles.missaoRow}
                onPress={() => navigation.navigate('GamificacaoMissoes')}
              >
                <View style={styles.missaoDot} />
                <Text variant="sm" weight="semiBold" style={styles.missaoText}>
                  {m.texto}
                </Text>
              </Pressable>
            ))
          )}
        </View>

        <Text variant="xs" weight="bold" color="primary" style={[styles.sectionTitle, styles.missoesTitle]}>
          EXPLORAR
        </Text>
        <View style={styles.menuGrid}>
          {MENU_ITENS.map(({ label, route, Icon }) => (
            <Pressable key={route} style={styles.menuItem} onPress={() => navigation.navigate(route)}>
              <Icon size={18} color={theme.colors.accent.leather} />
              <Text variant="xs" weight="bold" style={styles.menuLabel}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: theme.colors.surfaceDark,
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
  },
  levelGlow: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(201,161,90,0.14)',
  },
  avatarRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: theme.colors.accent.gold,
    padding: 3,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 38,
    backgroundColor: 'rgba(251,249,244,0.14)',
  },
  userName: {
    marginTop: theme.spacing.md,
  },
  levelLabel: {
    marginTop: 2,
    letterSpacing: 0.4,
  },
  xpTrack: {
    marginTop: theme.spacing.md,
    width: '100%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(251,249,244,0.14)',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.accent.gold,
  },
  xpLabel: {
    marginTop: theme.spacing.sm,
  },
  statsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  statValue: {
    marginTop: theme.spacing.sm,
  },
  sectionHeader: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    letterSpacing: 0.6,
  },
  emptyCard: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.03)',
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
  conquistasRow: {
    marginTop: theme.spacing.sm,
  },
  conquistaItem: {
    width: 84,
    marginRight: theme.spacing.sm,
    alignItems: 'center',
  },
  conquistaIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(201,161,90,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conquistaLabel: {
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  missoesTitle: {
    marginTop: theme.spacing.lg,
  },
  missoesList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  missaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  missaoDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(107,115,83,0.12)',
  },
  missaoText: {
    flex: 1,
  },
  menuGrid: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  menuItem: {
    width: '31%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    gap: theme.spacing.xs,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  menuLabel: {
    textAlign: 'center',
  },
});

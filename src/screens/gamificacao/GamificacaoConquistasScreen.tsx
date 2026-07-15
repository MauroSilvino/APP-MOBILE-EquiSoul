import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentType, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import {
  BackIcon,
  CalendarIcon,
  CameraIcon,
  DiaryIcon,
  HeartIcon,
  MountainIcon,
  ShieldIcon,
} from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import {
  CONQUISTAS_CATALOG,
  CONQUISTA_CATEGORIAS,
  ConquistaDef,
  ConquistaIcon,
  useConquistaContext,
} from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoConquistas'>;

const ICON_BY_KEY: Record<ConquistaIcon, ComponentType<{ size?: number; color?: string }>> = {
  livro: DiaryIcon,
  montanha: MountainIcon,
  taca: MountainIcon,
  coracao: HeartIcon,
  camera: CameraIcon,
  calendario: CalendarIcon,
  escudo: ShieldIcon,
};

export function GamificacaoConquistasScreen({ navigation }: Props) {
  const horse = useHorseStore((state) => state.horses[0] ?? null);
  const nomeCavalo = horse?.nome || 'seu cavalo';
  const ctx = useConquistaContext();

  const [categoria, setCategoria] = useState<(typeof CONQUISTA_CATEGORIAS)[number]>('Todas');
  const [detalhe, setDetalhe] = useState<ConquistaDef | null>(null);

  const lista = CONQUISTAS_CATALOG.filter((c) => categoria === 'Todas' || c.categoria === categoria);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Voltar ao centro de evolução"
            style={styles.backButton}
            onPress={() => navigation.navigate('GamificacaoHub')}
            hitSlop={8}
          >
            <BackIcon size={15} strokeWidth={2.2} />
          </Pressable>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.eyebrow}>
              GAMIFICAÇÃO
            </Text>
            <Text variant="xl" weight="extraBold">
              Conquistas
            </Text>
          </View>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Cada conquista conta uma história vivida com {nomeCavalo}.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {CONQUISTA_CATEGORIAS.map((label) => (
            <View key={label} style={styles.chipWrap}>
              <Chip label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {lista.map((c) => {
            const unlocked = c.isUnlocked(ctx);
            const Icon = ICON_BY_KEY[c.icon];
            return (
              <Pressable
                key={c.id}
                style={[styles.card, !unlocked && styles.cardLocked]}
                onPress={() => !unlocked && setDetalhe(c)}
              >
                <View
                  style={[
                    styles.iconWrap,
                    { backgroundColor: unlocked ? 'rgba(201,161,90,0.16)' : 'rgba(43,41,36,0.06)' },
                  ]}
                >
                  <Icon size={24} color={unlocked ? theme.colors.accent.leather : theme.colors.text.tertiary} />
                </View>
                <Text variant="sm" weight="bold" style={styles.cardNome}>
                  {c.nome}
                </Text>
                <Text
                  variant="xs"
                  weight="bold"
                  color={theme.colors.accent.leather}
                  style={styles.cardTipo}
                >
                  {c.tipo.toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {!!detalhe && (
        <View style={styles.overlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setDetalhe(null)} />
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <View style={styles.sheetIconWrap}>
              <ShieldIcon size={26} color={theme.colors.text.tertiary} />
            </View>
            <Text variant="lg" weight="extraBold" style={styles.sheetTitle}>
              {detalhe.nome}
            </Text>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.sheetTipo}>
              {detalhe.tipo.toUpperCase()} · BLOQUEADA
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.sheetRequisito}>
              {detalhe.requisito}
            </Text>
            <Pressable style={styles.sheetButton} onPress={() => setDetalhe(null)}>
              <Text variant="md" weight="extraBold" color="inverse">
                Entendi
              </Text>
            </Pressable>
          </View>
        </View>
      )}
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
    gap: theme.spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  eyebrow: {
    letterSpacing: 0.6,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
  },
  chipWrap: {
    marginRight: theme.spacing.sm,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardLocked: {
    backgroundColor: 'rgba(43,41,36,0.03)',
    shadowOpacity: 0,
    elevation: 0,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNome: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  cardTipo: {
    marginTop: 4,
    letterSpacing: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.4)',
    justifyContent: 'flex-end',
    zIndex: 30,
  },
  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    marginBottom: theme.spacing.lg,
  },
  sheetIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  sheetTipo: {
    marginTop: 2,
    letterSpacing: 0.4,
  },
  sheetRequisito: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    lineHeight: 20,
  },
  sheetButton: {
    marginTop: theme.spacing.lg,
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

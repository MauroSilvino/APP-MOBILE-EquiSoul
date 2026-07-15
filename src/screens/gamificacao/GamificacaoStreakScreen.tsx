import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon, FlameIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useGamificationStore } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoStreak'>;

export function GamificacaoStreakScreen({ navigation }: Props) {
  const streakDias = useGamificationStore((state) => state.streakDias);
  const streakSemana = useGamificationStore((state) => state.streakSemana);
  const registradoHoje = useGamificationStore((state) => state.registradoHojeStreak);
  const registrarHojeStreak = useGamificationStore((state) => state.registrarHojeStreak);

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
              Sequência
            </Text>
          </View>
        </View>

        <View style={styles.center}>
          <View style={styles.flameGlow}>
            <FlameIcon size={48} />
          </View>
          <Text variant="xxl" weight="extraBold" style={styles.streakValue}>
            {streakDias} dias
          </Text>
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.streakSub}>
            consecutivos registrando momentos
          </Text>

          <View style={styles.weekRow}>
            {streakSemana.map((done, index) => (
              <View key={index} style={[styles.weekDot, done && styles.weekDotDone]}>
                {done && <CheckIcon size={15} strokeWidth={2.6} />}
              </View>
            ))}
          </View>

          <Pressable
            style={[styles.registrarButton, registradoHoje && styles.registrarButtonDone]}
            onPress={registrarHojeStreak}
            disabled={registradoHoje}
          >
            <CheckIcon size={16} strokeWidth={2.2} color={registradoHoje ? theme.colors.accent.moss : theme.colors.background} />
            <Text
              variant="sm"
              weight="extraBold"
              color={registradoHoje ? theme.colors.accent.moss : 'inverse'}
            >
              {registradoHoje ? 'Registrado hoje ✓' : 'Registrar hoje'}
            </Text>
          </Pressable>

          <View style={styles.recoveryCard}>
            <Text variant="sm" weight="bold" color={theme.colors.accent.moss}>
              Perdeu um dia? Sem problema.
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.recoveryText}>
              Sua sequência tem um dia de recuperação — o importante é continuar a jornada, não a
              perfeição.
            </Text>
          </View>
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
  center: {
    marginTop: theme.spacing.xxl,
    alignItems: 'center',
  },
  flameGlow: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(201,161,90,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakValue: {
    marginTop: theme.spacing.md,
  },
  streakSub: {
    marginTop: 4,
  },
  weekRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  weekDot: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDotDone: {
    backgroundColor: theme.colors.accent.olive,
  },
  registrarButton: {
    marginTop: theme.spacing.lg,
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surfaceDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  registrarButtonDone: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  recoveryCard: {
    marginTop: theme.spacing.lg,
    width: '100%',
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(107,115,83,0.1)',
    padding: theme.spacing.md,
  },
  recoveryText: {
    marginTop: theme.spacing.xs,
    lineHeight: 18,
  },
});

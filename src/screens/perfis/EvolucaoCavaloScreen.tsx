import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EvolucaoCavalo'>;

const STATS = [
  { label: 'Treinos por mês', value: '12', pct: '78%', color: theme.colors.accent.olive },
  { label: 'Horas montadas', value: '34h', pct: '60%', color: theme.colors.accent.leather },
  { label: 'Distância percorrida', value: '96km', pct: '45%', color: theme.colors.accent.gold },
] as const;

export function EvolucaoCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Evolução · {horse.nome}
        </Text>

        <View style={styles.insightCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.insightEyebrow}>
            INSIGHT DA IA
          </Text>
          <Text variant="md" weight="semiBold" color="inverse" style={styles.insightText}>
            Vocês aumentaram a frequência de treinos em 18% neste mês.
          </Text>
        </View>

        <View style={styles.statsList}>
          {STATS.map((item) => (
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

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          ANTES E DEPOIS
        </Text>
        <View style={styles.compareRow}>
          <ImagePlaceholder caption="há 6 meses" style={styles.compareTile} />
          <ImagePlaceholder caption="hoje" style={styles.compareTile} />
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('PerfilCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: 150,
  },
  insightCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceDark,
  },
  insightEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  insightText: {
    marginTop: 6,
    lineHeight: 20,
  },
  statsList: {
    marginTop: theme.spacing.xl,
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
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  compareRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  compareTile: {
    flex: 1,
    height: 140,
    borderRadius: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 4,
  },
});

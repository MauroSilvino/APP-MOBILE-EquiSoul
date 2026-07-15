import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { AiIcon, BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumIA'>;

export function PremiumIAScreen({ navigation }: Props) {
  const iaPremiumRecursos = usePremiumStore((state) => state.iaPremiumRecursos);
  const iaPremiumCriacoes = usePremiumStore((state) => state.iaPremiumCriacoes);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          IA Premium
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Storytelling avançado para a história de vocês.
        </Text>

        <View style={styles.list}>
          {iaPremiumRecursos.map((recurso) => (
            <View key={recurso} style={styles.row}>
              <AiIcon size={17} />
              <Text variant="sm" weight="bold" style={styles.rowLabel}>
                {recurso}
              </Text>
            </View>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          A IA PODE CRIAR
        </Text>
        <View style={styles.chips}>
          {iaPremiumCriacoes.map((criacao) => (
            <View key={criacao} style={styles.chip}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                {criacao}
              </Text>
            </View>
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
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  rowLabel: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
});

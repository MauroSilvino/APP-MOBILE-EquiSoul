import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CommunityIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumClube'>;

export function PremiumClubeScreen({ navigation }: Props) {
  const clubeItens = usePremiumStore((state) => state.clubeItens);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Clube Premium
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Uma comunidade exclusiva de cavaleiros.
        </Text>

        <View style={styles.list}>
          {clubeItens.map((item) => (
            <View key={item} style={styles.row}>
              <CommunityIcon size={17} color={theme.colors.accent.leather} />
              <Text variant="sm" weight="bold" style={styles.rowLabel}>
                {item}
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
});

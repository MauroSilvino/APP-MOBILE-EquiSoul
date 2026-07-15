import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumBackup'>;

const USADOS_GB = 36;
const TOTAL_GB = 200;

export function PremiumBackupScreen({ navigation }: Props) {
  const backupPremiumItens = usePremiumStore((state) => state.backupPremiumItens);
  const percent = Math.round((USADOS_GB / TOTAL_GB) * 100);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Backup Premium
        </Text>

        <View style={styles.storageCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.storageLabel}>
            ARMAZENAMENTO
          </Text>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percent}%` }]} />
          </View>
          <Text variant="xs" weight="semiBold" color="secondary" style={styles.storageNote}>
            {USADOS_GB} GB de {TOTAL_GB} GB utilizados
          </Text>
        </View>

        <View style={styles.list}>
          {backupPremiumItens.map((item) => (
            <View key={item} style={styles.listItem}>
              <CheckIcon size={16} color={theme.colors.accent.olive} strokeWidth={2} />
              <Text variant="sm" weight="semiBold">
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
  storageCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  storageLabel: {
    letterSpacing: 0.4,
  },
  progressTrack: {
    marginTop: theme.spacing.sm,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(43,41,36,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.accent.gold,
  },
  storageNote: {
    marginTop: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});

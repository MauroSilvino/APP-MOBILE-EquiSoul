import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from '../ui/Text';

interface SetupProgressBarProps {
  step: number;
  total: number;
}

export function SetupProgressBar({ step, total }: SetupProgressBarProps) {
  const percent = Math.round((step / total) * 100);

  return (
    <View style={styles.row}>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
      <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.label}>
        Passo {step} de {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: theme.colors.accent.gold,
  },
  label: {
    flexShrink: 0,
  },
});

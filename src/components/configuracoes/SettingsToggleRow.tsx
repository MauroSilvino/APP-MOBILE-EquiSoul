import { StyleSheet, View } from 'react-native';
import { Switch } from '../ui/Switch';
import { Text } from '../ui/Text';
import { theme } from '../../theme';

interface SettingsToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function SettingsToggleRow({ label, description, value, onValueChange }: SettingsToggleRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        <Text variant="sm" weight="bold">
          {label}
        </Text>
        {!!description && (
          <Text variant="xs" weight="medium" color="secondary" style={styles.description}>
            {description}
          </Text>
        )}
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.06)',
  },
  texts: {
    flex: 1,
  },
  description: {
    marginTop: 2,
  },
});

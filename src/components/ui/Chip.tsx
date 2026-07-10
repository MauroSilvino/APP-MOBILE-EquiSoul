import { Pressable, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
});

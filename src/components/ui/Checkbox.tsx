import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { CheckIcon } from './icons';
import { Text } from './Text';

interface CheckboxProps {
  checked: boolean;
  onToggle: () => void;
}

export function Checkbox({ checked, onToggle, children }: PropsWithChildren<CheckboxProps>) {
  return (
    <Pressable style={styles.row} onPress={onToggle}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <CheckIcon size={13} color={theme.colors.text.inverse} />}
      </View>
      <Text variant="sm" weight="medium" color="secondary" style={styles.label}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: 'rgba(43,41,36,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: theme.colors.accent.moss,
  },
  label: {
    flex: 1,
  },
});

import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from '../ui/Text';
import { MenuIcon, SearchIcon } from '../ui/icons';

interface AdminHeaderProps {
  onMenu: () => void;
  onSearch: () => void;
}

export function AdminHeader({ onMenu, onSearch }: AdminHeaderProps) {
  return (
    <View style={styles.bar}>
      <Pressable style={styles.iconButton} onPress={onMenu} hitSlop={8} accessibilityLabel="Abrir menu de módulos">
        <MenuIcon size={18} />
      </Pressable>
      <Text variant="xs" weight="bold" color="tertiary" style={styles.label}>
        Admin: Renata Souza · Super Admin
      </Text>
      <Pressable style={styles.iconButton} onPress={onSearch} hitSlop={8} accessibilityLabel="Busca global">
        <SearchIcon size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    textAlign: 'center',
  },
});

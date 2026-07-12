import { Pressable, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { HeartIcon } from './icons';

interface FavoriteToggleProps {
  favorito: boolean;
  onToggle: () => void;
  size?: number;
}

export function FavoriteToggle({ favorito, onToggle, size = 22 }: FavoriteToggleProps) {
  return (
    <Pressable style={styles.button} onPress={onToggle} hitSlop={8}>
      <HeartIcon size={size} color={theme.colors.accent.gold} filled={favorito} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

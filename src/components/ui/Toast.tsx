import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((msg: string) => {
    setMessage(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message, show };
}

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <View style={styles.toast} pointerEvents="none">
      <Text variant="sm" weight="bold" color="inverse" style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: theme.spacing.xl,
    right: theme.spacing.xl,
    bottom: theme.spacing.xxl,
    zIndex: 80,
    backgroundColor: theme.colors.surfaceDark,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.card,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 8,
  },
  text: {
    textAlign: 'center',
  },
});

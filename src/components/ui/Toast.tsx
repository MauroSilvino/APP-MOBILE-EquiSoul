import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

interface ToastAction {
  label: string;
  onPress: () => void;
}

interface ToastState {
  message: string;
  action?: ToastAction;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((msg: string, action?: ToastAction) => {
    setToast({ message: msg, action });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { message: toast?.message ?? null, action: toast?.action, show };
}

interface ToastProps {
  message: string | null;
  action?: ToastAction;
}

export function Toast({ message, action }: ToastProps) {
  if (!message) return null;

  return (
    <View style={styles.toast} pointerEvents={action ? 'box-none' : 'none'}>
      <Text variant="sm" weight="bold" color="inverse" style={styles.text}>
        {message}
      </Text>
      {!!action && (
        <Pressable onPress={action.onPress} hitSlop={8}>
          <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
            {action.label}
          </Text>
        </Pressable>
      )}
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

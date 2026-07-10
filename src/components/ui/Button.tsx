import { PropsWithChildren } from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
}

export function Button({ children, variant = 'primary', style, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' ? styles.primary : styles.secondary,
        pressed && styles.pressed,
        typeof style === 'function' ? style({ pressed }) : style,
      ]}
      {...props}
    >
      <Text variant="lg" weight="extraBold" color="primary">
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.accent.gold,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
  },
  pressed: {
    opacity: 0.85,
  },
});

import { PropsWithChildren } from 'react';
import { Platform, StyleSheet, View, ViewProps } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

interface ImagePlaceholderProps extends ViewProps {
  caption: string;
  captionColor?: string;
}

export function ImagePlaceholder({
  caption,
  captionColor = theme.colors.accent.leather,
  style,
  children,
  ...props
}: PropsWithChildren<ImagePlaceholderProps>) {
  return (
    <View style={[styles.base, style]} {...props}>
      <Text variant="xs" weight="semiBold" color={captionColor} style={styles.caption}>
        {caption}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.colors.placeholder.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    paddingHorizontal: 30,
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
  },
});

import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type Variant = keyof typeof theme.typography.sizes;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: keyof typeof theme.colors.text | string;
  weight?: 'regular' | 'medium' | 'bold';
}

export function Text({ variant = 'md', color = 'primary', weight = 'regular', style, ...props }: TextProps) {
  const resolvedColor =
    color in theme.colors.text ? theme.colors.text[color as keyof typeof theme.colors.text] : color;

  return (
    <RNText
      style={[
        styles.base,
        {
          fontSize: theme.typography.sizes[variant],
          lineHeight: theme.typography.lineHeights[variant],
          color: resolvedColor,
          fontFamily: theme.typography.fontFamily[weight],
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  base: {},
});

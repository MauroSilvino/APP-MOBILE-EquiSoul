import colors from '../../design-system/tokens/colors.json';
import typography from '../../design-system/tokens/typography.json';
import spacing from '../../design-system/tokens/spacing.json';

export const theme = {
  colors,
  typography,
  spacing: spacing.spacing,
  radius: spacing.radius,
} as const;

export type Theme = typeof theme;

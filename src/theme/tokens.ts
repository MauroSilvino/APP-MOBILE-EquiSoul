import colors from '../../design-system/tokens/colors.json';
import typography from '../../design-system/tokens/typography.json';
import spacing from '../../design-system/tokens/spacing.json';

export const theme = {
  colors,
  typography,
  spacing: spacing.spacing,
  radius: spacing.radius,
  buttonHeight: spacing.buttonHeight,
  cardPadding: spacing.cardPadding,
  listGap: spacing.listGap,
  sectionGap: spacing.sectionGap,
  chipPadding: spacing.chipPadding,
  shadow: spacing.shadow,
} as const;

export type Theme = typeof theme;

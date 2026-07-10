import { theme } from '../theme';

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3;
  widthPercent: number;
  color: string;
  label: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (password.length === 0) {
    return { score: 0, widthPercent: 0, color: theme.colors.error, label: 'Digite uma senha' };
  }

  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  if (score <= 1) {
    return { score: 1, widthPercent: 33, color: theme.colors.error, label: 'Senha fraca' };
  }
  if (score === 2) {
    return { score: 2, widthPercent: 66, color: theme.colors.accent.gold, label: 'Senha média' };
  }
  return { score: 3, widthPercent: 100, color: theme.colors.accent.moss, label: 'Senha forte' };
}

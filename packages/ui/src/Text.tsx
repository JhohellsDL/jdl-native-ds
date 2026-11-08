import { Text as NativeText, type TextProps } from 'react-native';
import { useTheme } from './ThemeProvider';
import type { TypographyVariant } from './theme';

type Props = TextProps & {
  variant?: TypographyVariant;
  tone?: 'default' | 'muted' | 'accent';
};

export function Text({ variant = 'body', tone = 'default', style, ...props }: Props) {
  const theme = useTheme();
  const colors = { default: theme.colors.text, muted: theme.colors.mutedText, accent: theme.action.accentText };
  return <NativeText {...props} style={[theme.typography[variant], { color: colors[tone] }, style]} />;
}

import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import { Text } from './Text';
import { useTheme } from './ThemeProvider';

type ActionProps = Pick<PressableProps, 'onPress' | 'disabled' | 'testID' | 'accessibilityHint'>;

type ButtonProps = ActionProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  loading?: boolean;
  icon?: (color: string) => ReactNode;
};

export function Button({
  label, variant = 'primary', size = 'md', loading = false, disabled, icon, ...props
}: ButtonProps) {
  const { action, colors, radius, spacing } = useTheme();
  const variants = {
    primary: { background: action.primary, foreground: action.onPrimary, border: action.primary },
    secondary: { background: colors.surface, foreground: colors.text, border: colors.controlBorder },
    ghost: { background: 'transparent', foreground: action.accentText, border: 'transparent' },
  };
  const { background, foreground, border } = variants[variant];
  const unavailable = Boolean(disabled || loading);

  return (
    <Pressable
      {...props}
      disabled={unavailable}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: unavailable, busy: loading }}
      style={({ pressed }) => ({
        minHeight: size === 'sm' ? 44 : 50,
        paddingHorizontal: size === 'sm' ? spacing.md : spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: radius.pill,
        backgroundColor: background,
        borderColor: border,
        borderWidth: 1,
        opacity: disabled ? 0.45 : pressed ? 0.76 : 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
      })}
    >
      {loading ? <ActivityIndicator size="small" color={foreground} /> : icon?.(foreground)}
      <Text variant="label" style={{ color: foreground, flexShrink: 1, textAlign: 'center' }}>{label}</Text>
    </Pressable>
  );
}

type IconButtonProps = ActionProps & {
  label: string;
  icon: (color: string) => ReactNode;
};

export function IconButton({ label, icon, disabled, ...props }: IconButtonProps) {
  const { colors, radius } = useTheme();
  return (
    <Pressable
      {...props}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: Boolean(disabled) }}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: radius.pill,
        borderColor: colors.controlBorder,
        borderWidth: 1,
        backgroundColor: pressed ? colors.mutedSurface : colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.45 : 1,
      })}
    >
      {icon(colors.text)}
    </Pressable>
  );
}

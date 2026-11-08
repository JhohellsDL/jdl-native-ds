import { useState, type ReactNode } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { Text } from './Text';
import { useTheme } from './ThemeProvider';

type Props = Omit<TextInputProps, 'style' | 'accessibilityLabel'> & {
  label: string;
  error?: string;
  icon?: (color: string) => ReactNode;
};

export function TextField({ label, error, icon, onFocus, onBlur, ...props }: Props) {
  const { colors, action, status, radius, spacing, typography } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = error ? status.danger : focused ? action.primary : colors.controlBorder;
  return (
    <View style={{ gap: spacing.xs }}>
      <Text variant="label">{label}</Text>
      <View style={{
        flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 48,
        backgroundColor: colors.surface, borderRadius: radius.control,
        borderColor, borderWidth: focused ? 2 : 1, paddingHorizontal: focused ? 11 : 12,
      }}>
        {icon?.(colors.mutedText)}
        <TextInput
          {...props}
          accessibilityLabel={label}
          accessibilityHint={error ?? props.accessibilityHint}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          placeholderTextColor={colors.mutedText}
          selectionColor={action.primary}
          style={[typography.body, { color: colors.text, flex: 1, minWidth: 0, minHeight: 46, paddingVertical: spacing.sm }]}
        />
      </View>
      {error && <Text accessibilityLiveRegion="polite" variant="caption" style={{ color: status.danger }}>{error}</Text>}
    </View>
  );
}

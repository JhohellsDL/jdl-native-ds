import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text } from './Text';
import { useTheme } from './ThemeProvider';

type CardProps = ViewProps & { tone?: 'surface' | 'muted' };

export function Card({ tone = 'surface', style, ...props }: CardProps) {
  const { colors, radius, spacing } = useTheme();
  return <View {...props} style={[{
    backgroundColor: tone === 'surface' ? colors.surface : colors.mutedSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  }, style]} />;
}

export function Badge({ label, tone = 'neutral' }: {
  label: string;
  tone?: 'neutral' | 'accent' | 'success' | 'danger';
}) {
  const { colors, action, status, radius, spacing } = useTheme();
  const tones = {
    neutral: [colors.mutedSurface, colors.mutedText],
    accent: [action.accentSurface, action.accentText],
    success: [status.successSurface, status.success],
    danger: [status.dangerSurface, status.danger],
  };
  const [backgroundColor, color] = tones[tone];
  return (
    <View style={{ backgroundColor, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, alignSelf: 'flex-start' }}>
      <Text variant="caption" style={{ color }}>{label}</Text>
    </View>
  );
}

export function MetricCard({ label, value, detail, icon }: {
  label: string;
  value: string;
  detail?: string;
  icon?: (color: string) => ReactNode;
}) {
  const { action, radius, spacing } = useTheme();
  return (
    <Card style={{ gap: spacing.sm, flex: 1, minWidth: 0 }}>
      {icon && <View style={{ width: 36, height: 36, borderRadius: radius.control, alignItems: 'center', justifyContent: 'center', backgroundColor: action.accentSurface }}>
        {icon(action.accentText)}
      </View>}
      <Text tone="muted" variant="label">{label}</Text>
      <Text variant="subtitle">{value}</Text>
      {detail && <Text tone="muted" variant="caption">{detail}</Text>}
    </Card>
  );
}

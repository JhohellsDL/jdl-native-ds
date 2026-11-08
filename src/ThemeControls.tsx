import { Pressable, StyleSheet, View } from 'react-native';
import { Check, Moon, Sun } from 'lucide-react-native';
import { createTheme, paletteNames, Text, useTheme, type Mode, type PaletteName } from '@jhohellsdl/native-ds';

export const paletteIds = Object.keys(paletteNames) as PaletteName[];

export function ThemeControls({ onPalette, onMode, compact = false }: {
  onPalette: (palette: PaletteName) => void;
  onMode: (mode: Mode) => void;
  compact?: boolean;
}) {
  const theme = useTheme();
  const { action, colors, mode, palette, radius } = theme;

  return (
    <View style={[styles.controls, compact && styles.compact]}>
      <View style={styles.group}>
        {!compact && <Text variant="caption" tone="muted" style={styles.caption}>PALETA</Text>}
        <View accessibilityLabel="Paletas" style={styles.swatches}>
          {paletteIds.map((id) => {
            const selected = id === palette;
            const sample = createTheme(id, mode);
            return (
              <Pressable
                key={id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={paletteNames[id]}
                onPress={() => onPalette(id)}
                style={({ pressed }) => [
                  styles.swatchButton,
                  { borderColor: selected ? action.primary : 'transparent', opacity: pressed ? 0.72 : 1 },
                ]}
              >
                <View style={[styles.swatch, { backgroundColor: sample.action.primary }]}>
                  {selected && <Check size={14} strokeWidth={2.8} color={sample.action.onPrimary} />}
                </View>
              </Pressable>
            );
          })}
        </View>
        {!compact && <Text variant="label">{paletteNames[palette]}</Text>}
      </View>
      <View style={styles.group}>
        {!compact && <Text variant="caption" tone="muted" style={styles.caption}>APARIENCIA</Text>}
        <View style={[styles.segmented, { backgroundColor: colors.mutedSurface, borderRadius: radius.control }]}>
          {(['light', 'dark'] as const).map((item) => {
            const selected = item === mode;
            const Icon = item === 'light' ? Sun : Moon;
            const label = item === 'light' ? 'Claro' : 'Oscuro';
            return (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityState={{ selected }}
                onPress={() => onMode(item)}
                style={({ pressed }) => [styles.segment, {
                  backgroundColor: selected ? colors.surface : 'transparent',
                  borderColor: selected ? colors.border : 'transparent',
                  opacity: pressed ? 0.7 : 1,
                }]}
              >
                <Icon size={15} color={selected ? action.accentText : colors.mutedText} />
                {!compact && <Text variant="caption" tone={selected ? 'default' : 'muted'}>{label}</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: { gap: 16 },
  compact: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  group: { gap: 4 },
  caption: { letterSpacing: 1.4, fontWeight: '700' },
  swatches: { flexDirection: 'row', flexWrap: 'wrap' },
  swatchButton: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  swatch: { width: 29, height: 29, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  segmented: { flexDirection: 'row', padding: 3, alignSelf: 'flex-start', gap: 3 },
  segment: { minWidth: 44, minHeight: 44, paddingHorizontal: 7, borderRadius: 11, borderWidth: 1, flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'center' },
});

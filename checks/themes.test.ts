import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createTheme, paletteNames, type PaletteName } from '../packages/ui/src/theme.ts';

function luminance(hex: string) {
  const channels = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255);
  const [r, g, b] = channels.map((channel) => channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function assertContrast(foreground: string, background: string, target = 4.5) {
  const values = [luminance(foreground), luminance(background)];
  const ratio = (Math.max(...values) + 0.05) / (Math.min(...values) + 0.05);
  assert.ok(ratio >= target, `${foreground} / ${background}: ${ratio.toFixed(2)} < ${target}`);
}

for (const palette of Object.keys(paletteNames) as PaletteName[]) {
  for (const mode of ['light', 'dark'] as const) {
    test(`${palette}/${mode} mantiene contraste en los roles de UI`, () => {
      const { colors, action, status, feature } = createTheme(palette, mode);
      for (const surface of [colors.canvas, colors.surface, colors.mutedSurface]) {
        assertContrast(colors.text, surface);
        assertContrast(colors.mutedText, surface);
        assertContrast(action.accentText, surface);
      }
      assertContrast(colors.controlBorder, colors.surface, 3);
      assertContrast(action.onPrimary, action.primary);
      assertContrast(action.accentText, action.accentSurface);
      assertContrast(status.success, status.successSurface);
      assertContrast(status.danger, status.dangerSurface);
      assertContrast(status.danger, colors.surface);
      for (const stop of feature.gradient) assertContrast(feature.text, stop);
    });
  }
}

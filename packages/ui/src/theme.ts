export const paletteNames = {
  cobalt: 'Cobalto',
  iris: 'Iris',
  rose: 'Rosa',
  amber: 'Ámbar',
  graphite: 'Grafito',
} as const;

export type PaletteName = keyof typeof paletteNames;
export type Mode = 'light' | 'dark';

type PaletteColors = {
  canvas: string;
  surface: string;
  mutedSurface: string;
  text: string;
  mutedText: string;
  border: string;
  controlBorder: string;
  primary: string;
  onPrimary: string;
  accentSurface: string;
  accentText: string;
  feature: readonly [string, string];
};

const palettes = {
  cobalt: {
    light: { canvas: '#F2F5FB', surface: '#FFFFFF', mutedSurface: '#EBF0F8', text: '#172337', mutedText: '#52627B', border: '#DDE5F1', controlBorder: '#7D8DA5', primary: '#214FD2', onPrimary: '#FFFFFF', accentSurface: '#E3EBFF', accentText: '#2045AD', feature: ['#162C84', '#2858DA'] },
    dark: { canvas: '#101521', surface: '#191F2F', mutedSurface: '#222A3D', text: '#F3F6FF', mutedText: '#AAB8D0', border: '#303C53', controlBorder: '#7283A0', primary: '#A7BDFF', onPrimary: '#111B37', accentSurface: '#263865', accentText: '#C2D1FF', feature: ['#202E64', '#2C48A1'] },
  },
  iris: {
    light: { canvas: '#F6F4FB', surface: '#FFFFFF', mutedSurface: '#F0EBF9', text: '#241A36', mutedText: '#635572', border: '#E7DFEF', controlBorder: '#91819E', primary: '#6042C7', onPrimary: '#FFFFFF', accentSurface: '#EBE3FF', accentText: '#5032A0', feature: ['#3A207A', '#6948C8'] },
    dark: { canvas: '#15121E', surface: '#201A2D', mutedSurface: '#2B223B', text: '#F8F2FF', mutedText: '#C1B2D4', border: '#3C304E', controlBorder: '#8B79A4', primary: '#CDBBFF', onPrimary: '#24143E', accentSurface: '#3B2B60', accentText: '#E0D2FF', feature: ['#302052', '#543886'] },
  },
  rose: {
    light: { canvas: '#FCF4F6', surface: '#FFFFFF', mutedSurface: '#F8E9EF', text: '#341D28', mutedText: '#765363', border: '#EEDFE6', controlBorder: '#A48091', primary: '#A82F65', onPrimary: '#FFFFFF', accentSurface: '#FBE1EB', accentText: '#90234F', feature: ['#6A204E', '#AB376A'] },
    dark: { canvas: '#1B1218', surface: '#2A1C26', mutedSurface: '#35232F', text: '#FFF1F6', mutedText: '#D1ACBF', border: '#493241', controlBorder: '#A37D92', primary: '#F8ACCF', onPrimary: '#42162D', accentSurface: '#4B293D', accentText: '#FFD0E5', feature: ['#452037', '#793359'] },
  },
  amber: {
    light: { canvas: '#FBF6ED', surface: '#FFFFFF', mutedSurface: '#F6EEDF', text: '#322419', mutedText: '#705D4B', border: '#ECE0CF', controlBorder: '#9C846A', primary: '#88500B', onPrimary: '#FFFFFF', accentSurface: '#FBE9C8', accentText: '#744105', feature: ['#57321C', '#985A17'] },
    dark: { canvas: '#19150F', surface: '#252015', mutedSurface: '#32291B', text: '#FFF4E0', mutedText: '#CDB99C', border: '#443726', controlBorder: '#9A8566', primary: '#FFD386', onPrimary: '#362002', accentSurface: '#49341A', accentText: '#FFE0A8', feature: ['#3D2919', '#74501E'] },
  },
  graphite: {
    light: { canvas: '#F3F4F5', surface: '#FFFFFF', mutedSurface: '#EAEDF0', text: '#20242C', mutedText: '#535E6C', border: '#DEE3E8', controlBorder: '#828B99', primary: '#323943', onPrimary: '#FFFFFF', accentSurface: '#E5E9EE', accentText: '#354150', feature: ['#242930', '#4C5769'] },
    dark: { canvas: '#15171A', surface: '#202327', mutedSurface: '#2A2E34', text: '#F6F7F9', mutedText: '#B7C0CB', border: '#373D46', controlBorder: '#7B8695', primary: '#DFE6EF', onPrimary: '#212731', accentSurface: '#353D48', accentText: '#E3EBF5', feature: ['#262C37', '#49566A'] },
  },
} satisfies Record<PaletteName, Record<Mode, PaletteColors>>;

const foundations = {
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radius: { control: 14, card: 22, pill: 999 },
  typography: {
    display: { fontSize: 36, lineHeight: 42, fontWeight: '700', letterSpacing: -1.5 },
    title: { fontSize: 25, lineHeight: 31, fontWeight: '700', letterSpacing: -0.7 },
    subtitle: { fontSize: 17, lineHeight: 23, fontWeight: '600', letterSpacing: -0.2 },
    body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
    label: { fontSize: 13, lineHeight: 18, fontWeight: '600' },
    caption: { fontSize: 12, lineHeight: 17, fontWeight: '500' },
  },
} as const;

export function createTheme(palette: PaletteName, mode: Mode) {
  const { primary, onPrimary, accentText, accentSurface, feature, ...colors } = palettes[palette][mode];
  return {
    ...foundations,
    palette,
    mode,
    colors,
    action: { primary, onPrimary, accentSurface, accentText },
    feature: { gradient: feature, text: '#FFFFFF' },
    status: mode === 'light'
      ? { success: '#216249', successSurface: '#E1F3EA', danger: '#A52948', dangerSurface: '#FCE6EB' }
      : { success: '#A2E7C2', successSurface: '#203B31', danger: '#FFC0CE', dangerSurface: '#4C2935' },
  };
}

export type Theme = ReturnType<typeof createTheme>;
export type TypographyVariant = keyof Theme['typography'];

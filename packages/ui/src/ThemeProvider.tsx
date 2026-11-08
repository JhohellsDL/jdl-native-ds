import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme, type Mode, type PaletteName, type Theme } from './theme';

const ThemeContext = createContext<Theme | null>(null);

type ThemeProviderProps = PropsWithChildren<{
  palette?: PaletteName;
  mode?: Mode | 'system';
}>;

export function ThemeProvider({
  children,
  palette = 'cobalt',
  mode = 'system',
}: ThemeProviderProps) {
  const systemMode = useColorScheme();
  const resolvedMode = mode === 'system' ? systemMode ?? 'light' : mode;
  const theme = useMemo(() => createTheme(palette, resolvedMode), [palette, resolvedMode]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('Los componentes de JDL Native DS deben estar dentro de ThemeProvider.');
  }
  return theme;
}

import { useState, type PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';
import type { Preview } from '@storybook/react-native';
import { ThemeProvider, useTheme, type Mode, type PaletteName } from '@jdl/native-ds';
import { ThemeControls } from '../src/ThemeControls';

function Frame({ children, onPalette, onMode }: PropsWithChildren<{
  onPalette: (palette: PaletteName) => void; onMode: (mode: Mode) => void;
}>) {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.canvas }} keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ padding: 14, gap: 16 }}>
      <View style={{ borderBottomWidth: 1, borderColor: colors.border, paddingBottom: 10 }}>
        <ThemeControls compact onPalette={onPalette} onMode={onMode} />
      </View>
      {children}
    </ScrollView>
  );
}

function StoryTheme({ children }: PropsWithChildren) {
  const [palette, setPalette] = useState<PaletteName>('cobalt');
  const [mode, setMode] = useState<Mode>('light');
  return (
    <ThemeProvider palette={palette} mode={mode}>
      <Frame onPalette={setPalette} onMode={setMode}>{children}</Frame>
    </ThemeProvider>
  );
}

const preview: Preview = {
  decorators: [(Story) => <StoryTheme><Story /></StoryTheme>],
  parameters: { layout: 'fullscreen' },
};

export default preview;

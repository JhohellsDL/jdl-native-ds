import { useState, type ComponentType } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import { ArrowUpRight, Component, HeartPulse, Layers3, Moon, Wallet, type LucideIcon } from 'lucide-react-native';
import { Badge, Text, ThemeProvider, paletteNames, useTheme, type Mode, type PaletteName } from '@jdl/native-ds';
import { ComponentCatalog } from './ComponentCatalog';
import { HealthScreen, SleepScreen, WalletScreen } from './screens';
import { ThemeControls } from './ThemeControls';

const destinations = {
  health: { title: 'Salud', subtitle: 'Búsqueda, accesos de servicio y próximas citas.', icon: HeartPulse, Screen: HealthScreen, code: '01' },
  wallet: { title: 'Billetera', subtitle: 'Balance, acciones rápidas y movimientos recientes.', icon: Wallet, Screen: WalletScreen, code: '02' },
  sleep: { title: 'Descanso', subtitle: 'Métricas de sueño, actividad y alarma.', icon: Moon, Screen: SleepScreen, code: '03' },
  catalog: { title: 'Componentes', subtitle: 'Tokens y estados de las piezas que componen las demos.', icon: Component, Screen: ComponentCatalog, code: 'UI' },
} satisfies Record<string, { title: string; subtitle: string; icon: LucideIcon; Screen: ComponentType; code: string }>;

type Destination = keyof typeof destinations;
const links: Destination[] = ['health', 'wallet', 'sleep', 'catalog'];

function Laboratory({ onPalette, onMode }: {
  onPalette: (palette: PaletteName) => void; onMode: (mode: Mode) => void;
}) {
  const [page, setPage] = useState<Destination>('health');
  const theme = useTheme();
  const { colors, action } = theme;
  const desktop = useWindowDimensions().width >= 900;
  const { title, subtitle, Screen, code } = destinations[page];

  const navigation = links.map((id) => {
    const { icon: Icon, title: label } = destinations[id];
    const selected = id === page;
    return (
      <Pressable key={id} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected }} onPress={() => setPage(id)}
        style={({ pressed }) => [
          styles.navItem, !desktop && styles.navMobileItem, { backgroundColor: selected ? action.accentSurface : 'transparent', opacity: pressed ? 0.72 : 1 },
        ]}>
        <Icon size={17} strokeWidth={1.8} color={selected ? action.accentText : colors.mutedText} />
        <Text variant={desktop ? 'label' : 'caption'} tone={selected ? 'accent' : 'default'}>{!desktop && id === 'catalog' ? 'Catálogo' : label}</Text>
        {desktop && selected && <ArrowUpRight size={14} color={action.accentText} style={styles.navArrow} />}
      </Pressable>
    );
  });

  const brand = (
    <View style={styles.brand}>
      <View style={[styles.brandIcon, { backgroundColor: action.primary }]}>
        <Layers3 size={22} strokeWidth={1.7} color={action.onPrimary} />
      </View>
      <View>
        <Text variant="subtitle">JDL Native DS</Text>
        <Text variant="caption" tone="muted">Design System Lab</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.app, { backgroundColor: colors.canvas }]}>
      <StatusBar barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={styles.shell}>
        {desktop && (
          <ScrollView style={[styles.sidebar, { backgroundColor: colors.surface, borderColor: colors.border }]}
            contentContainerStyle={styles.sidebarContent}>
            {brand}
            <View style={styles.navGroup}>
              <Text variant="caption" tone="muted" style={styles.overline}>EXPLORAR</Text>
              {navigation}
            </View>
            <View style={[styles.sidebarDivider, { borderColor: colors.border }]}>
              <ThemeControls onPalette={onPalette} onMode={onMode} />
            </View>
            <View style={styles.sidebarFooter}>
              <Text variant="caption" tone="muted">JDL NATIVE DS / V0.1</Text>
              <Text variant="caption" tone="muted">5 paletas · 2 modos</Text>
            </View>
          </ScrollView>
        )}
        <ScrollView style={styles.main} contentContainerStyle={[styles.mainContent, desktop && styles.mainDesktop]}>
          {!desktop && (
            <View style={styles.mobileHeader}>
              {brand}
              <View style={styles.navMobile}>{navigation}</View>
              <ThemeControls compact onPalette={onPalette} onMode={onMode} />
            </View>
          )}
          <View style={[styles.content, desktop && styles.contentDesktop]}>
            <View style={[styles.titleBlock, { borderColor: colors.border }]}>
              <View style={styles.headingRow}>
                <Text variant="caption" tone="accent" style={styles.overline}>{page === 'catalog' ? 'CATÁLOGO' : 'PANTALLA DEMO'} / {code}</Text>
                <Badge label={paletteNames[theme.palette] + ' · ' + (theme.mode === 'light' ? 'Claro' : 'Oscuro')} tone="accent" />
              </View>
              <Text accessibilityRole="header" variant="display">{title}</Text>
              <Text tone="muted">{subtitle}</Text>
            </View>
            <Screen />
            <Text variant="caption" tone="muted">{page === 'catalog' ? 'JDL Native DS · Catálogo visual' : 'JDL Native DS · Datos de ejemplo'}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const [palette, setPalette] = useState<PaletteName>('cobalt');
  const [mode, setMode] = useState<Mode>('light');
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider palette={palette} mode={mode}>
        <Laboratory onPalette={setPalette} onMode={setMode} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1 },
  shell: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 268, flexGrow: 0, borderRightWidth: 1 },
  sidebarContent: { padding: 22, gap: 27 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  brandIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  navGroup: { gap: 5 },
  navMobile: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  navItem: { minHeight: 44, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center', flexDirection: 'row', gap: 7 },
  navMobileItem: { flex: 1, minWidth: 65, minHeight: 52, flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 4, gap: 3 },
  navArrow: { marginLeft: 'auto' },
  overline: { letterSpacing: 1.55, fontWeight: '700' },
  sidebarDivider: { borderTopWidth: 1, paddingTop: 20 },
  sidebarFooter: { gap: 2 },
  main: { flex: 1 },
  mainContent: { padding: 16, paddingBottom: 28 },
  mainDesktop: { paddingHorizontal: 36, paddingTop: 32, paddingBottom: 40 },
  mobileHeader: { gap: 10, marginBottom: 22 },
  content: { width: '100%', gap: 18 },
  contentDesktop: { alignSelf: 'center', maxWidth: 850 },
  titleBlock: { borderBottomWidth: 1, paddingBottom: 15, gap: 4 },
  headingRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 6 },
});

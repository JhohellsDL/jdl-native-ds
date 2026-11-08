import { useState, Component as ReactComponent, type ComponentType, type ReactNode } from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, useWindowDimensions, View } from 'react-native';
import { ArrowUpRight, Battery, Component, HeartPulse, Layers3, Monitor, Moon, Smartphone, Wallet, Wifi, type LucideIcon } from 'lucide-react-native';
import { Badge, Text, ThemeProvider, paletteNames, useTheme, type Mode, type PaletteName } from '@jdl/native-ds';
import { ComponentCatalog } from './ComponentCatalog';
import { HealthScreen, SleepScreen, WalletScreen, MobileViewContext } from './screens';
import { ThemeControls } from './ThemeControls';

const destinations = {
  health: { title: 'Salud', subtitle: 'Búsqueda, accesos de servicio y próximas citas.', icon: HeartPulse, Screen: HealthScreen, code: '01' },
  wallet: { title: 'Billetera', subtitle: 'Balance, acciones rápidas y movimientos recientes.', icon: Wallet, Screen: WalletScreen, code: '02' },
  sleep: { title: 'Descanso', subtitle: 'Métricas de sueño, actividad y alarma.', icon: Moon, Screen: SleepScreen, code: '03' },
  catalog: { title: 'Componentes', subtitle: 'Tokens y estados de las piezas que componen las demos.', icon: Component, Screen: ComponentCatalog, code: 'UI' },
} satisfies Record<string, { title: string; subtitle: string; icon: LucideIcon; Screen: ComponentType; code: string }>;

type Destination = keyof typeof destinations;
const links: Destination[] = ['health', 'wallet', 'sleep', 'catalog'];

function MobileDeviceFrame({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const { colors } = theme;
  const isDark = theme.mode === 'dark';

  return (
    <View style={styles.deviceWrapper}>
      <View
        style={[
          styles.deviceBezel,
          {
            borderColor: isDark ? '#334155' : '#0f172a',
            backgroundColor: colors.canvas,
          },
        ]}
      >
        {/* Barra superior de estado / Dynamic Island simulada */}
        <View style={styles.deviceStatusBar}>
          <Text variant="caption" style={styles.deviceTime}>9:41</Text>
          <View style={styles.dynamicIsland} />
          <View style={styles.deviceStatusIcons}>
            <Wifi size={13} strokeWidth={2.4} color={colors.text} />
            <Battery size={13} strokeWidth={2.4} color={colors.text} />
          </View>
        </View>

        {/* Contenido scrolleable dentro del teléfono */}
        <ScrollView
          style={styles.deviceScreenScroll}
          contentContainerStyle={styles.deviceScreenContent}
          showsVerticalScrollIndicator={false}
        >
          <MobileViewContext.Provider value={true}>
            {children}
          </MobileViewContext.Provider>
        </ScrollView>

        {/* Indicador inferior (Home bar) */}
        <View style={styles.deviceHomeBar}>
          <View
            style={[
              styles.deviceHomeIndicator,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.22)' },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

function Laboratory({ onPalette, onMode }: {
  onPalette: (palette: PaletteName) => void; onMode: (mode: Mode) => void;
}) {
  const [page, setPage] = useState<Destination>('health');
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');
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
                <View style={styles.headingControls}>
                  {desktop && (
                    <View style={[styles.viewportToggle, { backgroundColor: colors.mutedSurface, borderColor: colors.border }]}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Vista móvil de 390px"
                        onPress={() => setViewMode('mobile')}
                        style={[
                          styles.viewportButton,
                          viewMode === 'mobile' && { backgroundColor: colors.surface, borderColor: colors.border },
                        ]}
                      >
                        <Smartphone size={13} color={viewMode === 'mobile' ? action.accentText : colors.mutedText} />
                        <Text variant="caption" tone={viewMode === 'mobile' ? 'accent' : 'muted'} style={styles.viewportText}>
                          Móvil
                        </Text>
                      </Pressable>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Vista expandida"
                        onPress={() => setViewMode('responsive')}
                        style={[
                          styles.viewportButton,
                          viewMode === 'responsive' && { backgroundColor: colors.surface, borderColor: colors.border },
                        ]}
                      >
                        <Monitor size={13} color={viewMode === 'responsive' ? action.accentText : colors.mutedText} />
                        <Text variant="caption" tone={viewMode === 'responsive' ? 'accent' : 'muted'} style={styles.viewportText}>
                          Expandido
                        </Text>
                      </Pressable>
                    </View>
                  )}
                  <Badge label={paletteNames[theme.palette] + ' · ' + (theme.mode === 'light' ? 'Claro' : 'Oscuro')} tone="accent" />
                </View>
              </View>
              <Text accessibilityRole="header" variant="display">{title}</Text>
              <Text tone="muted">{subtitle}</Text>
            </View>
            {desktop && viewMode === 'mobile' ? (
              <MobileDeviceFrame>
                <Screen />
              </MobileDeviceFrame>
            ) : (
              <Screen />
            )}
            <Text variant="caption" tone="muted">{page === 'catalog' ? 'JDL Native DS · Catálogo visual' : 'JDL Native DS · Datos de ejemplo'}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

class ErrorBoundary extends ReactComponent<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error;
      return (
        <SafeAreaView style={{ flex: 1, padding: 32, justifyContent: 'center', backgroundColor: '#0f172a' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#f87171', marginBottom: 12 }}>
            Error al renderizar el laboratorio
          </Text>
          <Text style={{ fontSize: 14, color: '#e2e8f0', marginBottom: 8 }}>
            {err.message}
          </Text>
          <Text style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
            {err.stack}
          </Text>
        </SafeAreaView>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [palette, setPalette] = useState<PaletteName>('cobalt');
  const [mode, setMode] = useState<Mode>('light');
  return (
    <ThemeProvider palette={palette} mode={mode}>
      <ErrorBoundary>
        <Laboratory onPalette={setPalette} onMode={setMode} />
      </ErrorBoundary>
    </ThemeProvider>
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
  headingControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  viewportToggle: { flexDirection: 'row', padding: 2, borderRadius: 10, borderWidth: 1, gap: 2 },
  viewportButton: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: 'transparent' },
  viewportText: { fontWeight: '600' },
  deviceWrapper: { width: '100%', alignItems: 'center', paddingVertical: 14 },
  deviceBezel: {
    width: 390,
    maxWidth: '100%',
    height: 780,
    borderRadius: 48,
    borderWidth: 9,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.22,
    shadowRadius: 32,
    elevation: 14,
  },
  deviceStatusBar: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 4,
    zIndex: 10,
  },
  deviceTime: { fontSize: 13, fontWeight: '700', letterSpacing: -0.2 },
  dynamicIsland: { width: 96, height: 22, borderRadius: 11, backgroundColor: '#000000' },
  deviceStatusIcons: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  deviceScreenScroll: { flex: 1 },
  deviceScreenContent: { padding: 18, paddingBottom: 28, gap: 16 },
  deviceHomeBar: { height: 18, alignItems: 'center', justifyContent: 'center' },
  deviceHomeIndicator: { width: 126, height: 4, borderRadius: 2 },
});

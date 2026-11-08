import { useState, type ReactNode } from 'react';
import { StyleSheet, Switch, useWindowDimensions, View } from 'react-native';
import {
  Activity, ArrowDownLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock3, CreditCard, Eye, EyeOff,
  FlaskConical, HeartPulse, Moon, Search, ShieldPlus, ShoppingBag, Sun, Wallet,
} from 'lucide-react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { Badge, Button, Card, IconButton, MetricCard, Text, TextField, useTheme } from '@jdl/native-ds';

const iconSize = 17;
const white = '#FFFFFF';

function Feature({ eyebrow, title, detail, symbol, children }: {
  eyebrow: string; title: string; detail: string; symbol: ReactNode; children?: ReactNode;
}) {
  const { feature, radius } = useTheme();
  const compact = useWindowDimensions().width < 600;
  const onFeature = { color: feature.text };

  return (
    <View
      style={[
        styles.feature,
        {
          borderRadius: radius.card,
          padding: compact ? 22 : 28,
          backgroundColor: feature.gradient[0],
          overflow: 'hidden',
          position: 'relative',
        },
      ]}
    >
      <View style={[StyleSheet.absoluteFill, { overflow: 'hidden', borderRadius: radius.card }]} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <SvgLinearGradient id="featureGrad" x1="3%" y1="12%" x2="100%" y2="94%">
              <Stop offset="0" stopColor={feature.gradient[0]} />
              <Stop offset="1" stopColor={feature.gradient[1] ?? feature.gradient[0]} />
            </SvgLinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#featureGrad)" />
        </Svg>
      </View>
      <View pointerEvents="none" accessible={false} style={[styles.orbit, compact && styles.orbitCompact]}>
        <Svg width={292} height={234} viewBox="0 0 292 234">
          <Circle cx={150} cy={120} r={104} stroke={white} strokeOpacity={0.14} fill="none" />
          <Circle cx={150} cy={120} r={82} stroke={white} strokeOpacity={0.23} fill={white} fillOpacity={0.04} />
          <Circle cx={150} cy={120} r={58} stroke={white} strokeOpacity={0.4} fill={white} fillOpacity={0.12} />
          <Path d="M52 157C18 173 57 187 143 161S278 82 250 78" stroke={white} strokeOpacity={0.35} fill="none" />
          <Circle cx={211} cy={65} r={5} fill={white} fillOpacity={0.85} />
          <Circle cx={75} cy={153} r={3} fill={white} fillOpacity={0.8} />
        </Svg>
        <View style={styles.orbitIcon}>{symbol}</View>
      </View>
      <View style={[styles.featureCopy, { maxWidth: compact ? 260 : '66%' }]}>
        <Text variant="caption" style={[onFeature, styles.eyebrow]}>{eyebrow}</Text>
        <Text variant={compact ? 'title' : 'display'} style={onFeature}>{title}</Text>
        <Text style={onFeature}>{detail}</Text>
        {children && <View style={styles.featureActions}>{children}</View>}
      </View>
    </View>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ gap: 2 }}>
      <Text accessibilityRole="header" variant="subtitle">{title}</Text>
      {subtitle && <Text tone="muted" variant="caption">{subtitle}</Text>}
    </View>
  );
}

const specialties = [
  { label: 'Consulta general', detail: 'Atención médica', icon: HeartPulse },
  { label: 'Laboratorio', detail: 'Análisis y pruebas', icon: FlaskConical },
  { label: 'Prevención', detail: 'Chequeos de salud', icon: ShieldPlus },
];

function normalize(value: string) {
  return value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function HealthScreen() {
  const { colors, action, radius } = useTheme();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const filtered = specialties.filter(({ label, detail }) => normalize(label + ' ' + detail).includes(normalize(search)));

  return (
    <View style={styles.stack}>
      <Feature
        eyebrow="BIENESTAR PERSONAL"
        title="Tu salud, a un paso."
        detail="Encuentra atención y organiza tus citas."
        symbol={<HeartPulse size={55} color={white} strokeWidth={1.45} />}
      >
        <Button size="sm" variant="secondary" label="Reservar cita" onPress={() => setSelected('Consulta general')} icon={(color) => <ArrowRight color={color} size={iconSize} />} />
      </Feature>
      <TextField label="Buscar un servicio" value={search} onChangeText={setSearch} placeholder="Consulta, laboratorio o chequeo" icon={(color) => <Search color={color} size={iconSize} />} />
      <SectionTitle title="Servicios" subtitle="Explora las opciones de atención." />
      <View style={styles.tiles}>
        {filtered.map(({ label, detail, icon: Icon }) => (
          <Card key={label} style={styles.tile}>
            <View style={{ ...styles.iconWell, borderRadius: radius.control, backgroundColor: action.accentSurface }}>
              <Icon size={20} color={action.accentText} />
            </View>
            <Text variant="label">{label}</Text>
            <Text tone="muted" variant="caption" style={styles.grow}>{detail}</Text>
            <Button size="sm" variant={selected === label ? 'primary' : 'ghost'} label={selected === label ? 'Elegido' : 'Elegir'} accessibilityHint={label} onPress={() => setSelected(label)} />
          </Card>
        ))}
      </View>
      {!filtered.length && <Text tone="muted">No encontramos servicios con esa búsqueda.</Text>}
      <Card style={styles.listItem}>
        <CalendarDays size={22} color={colors.mutedText} />
        <View style={styles.grow}>
          <Text variant="label">{selected ? 'Servicio seleccionado' : 'Próxima cita'}</Text>
          <Text tone="muted" variant="caption">{selected || 'Cardiología · 24 de mayo, 10:30 a. m.'}</Text>
        </View>
        <Badge label={selected ? 'Demostración' : 'Confirmada'} tone={selected ? 'accent' : 'success'} />
      </Card>
    </View>
  );
}

const movements = [
  { name: 'Mercado local', category: 'Compras', amount: '−S/ 86.40', icon: ShoppingBag },
  { name: 'Transferencia recibida', category: 'Ingreso', amount: '+S/ 350.00', icon: ArrowDownLeft },
  { name: 'Suscripción mensual', category: 'Servicios', amount: '−S/ 29.90', icon: CreditCard },
];

export function WalletScreen() {
  const { action } = useTheme();
  const [visible, setVisible] = useState(true);
  const [selection, setSelection] = useState<'Enviar' | 'Recibir' | null>(null);
  return (
    <View style={styles.stack}>
      <Feature eyebrow="BALANCE DISPONIBLE" title={visible ? 'S/ 4,280.50' : '••••••••'} detail="Cuenta principal · PEN" symbol={<Wallet size={55} color={white} strokeWidth={1.45} />}>
        <IconButton label={visible ? 'Ocultar saldo' : 'Mostrar saldo'} onPress={() => setVisible(!visible)}
          icon={(color) => visible ? <EyeOff size={iconSize} color={color} /> : <Eye size={iconSize} color={color} />} />
      </Feature>
      <View style={styles.inline}>
        <Button label="Enviar" onPress={() => setSelection('Enviar')} icon={(color) => <ArrowUpRight size={iconSize} color={color} />} />
        <Button label="Recibir" variant="secondary" onPress={() => setSelection('Recibir')} icon={(color) => <ArrowDownLeft size={iconSize} color={color} />} />
      </View>
      {selection && (
        <Card style={styles.listItem} tone="muted">
          <Text style={styles.grow} accessibilityLiveRegion="polite">{selection === 'Enviar' ? 'Simulación de envío' : 'Simulación de recepción'}</Text>
          <Button label="Cerrar" variant="ghost" size="sm" onPress={() => setSelection(null)} />
        </Card>
      )}
      <SectionTitle title="Movimientos recientes" subtitle="Actividad de ejemplo de la cuenta." />
      <Card style={styles.movementCard}>
        {movements.map(({ name, category, amount, icon: Icon }) => (
          <View key={name} style={styles.listItem}>
            <Icon size={21} color={action.accentText} />
            <View style={styles.grow}>
              <Text variant="label">{name}</Text>
              <Text tone="muted" variant="caption">{category}</Text>
            </View>
            <Text variant="label">{amount}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
}

export function SleepScreen() {
  const { action, colors, radius } = useTheme();
  const [weekly, setWeekly] = useState(false);
  const [alarm, setAlarm] = useState(true);
  const scores = weekly ? [59, 74, 66, 88, 72, 94, 82] : [40, 64, 52, 76, 65, 88, 80];
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  return (
    <View style={styles.stack}>
      <Feature eyebrow={weekly ? 'PROMEDIO SEMANAL' : 'ÚLTIMA NOCHE'} title={weekly ? '7 h 48 min' : '8 h 12 min'}
        detail="Un vistazo a tu descanso y a tu próxima alarma." symbol={<Moon size={55} color={white} strokeWidth={1.45} />} />
      <View style={styles.inline}>
        <Button size="sm" label="Anoche" variant={weekly ? 'secondary' : 'primary'} onPress={() => setWeekly(false)} />
        <Button size="sm" label="Semana" variant={weekly ? 'primary' : 'secondary'} onPress={() => setWeekly(true)} />
      </View>
      <View style={styles.tiles}>
        <MetricCard label="Calidad de sueño" value={weekly ? '78 / 100' : '80 / 100'} detail="Puntaje de descanso" icon={(color) => <Activity color={color} size={19} />} />
        <MetricCard label="Hora de despertar" value="07:10" detail="Alarma habitual" icon={(color) => <Sun color={color} size={19} />} />
      </View>
      <Card style={styles.stack}>
        <SectionTitle title="Actividad semanal" subtitle="Puntaje diario de descanso." />
        <View style={styles.chart} accessible accessibilityLabel={scores.map((score, i) => `${['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][i]}: ${score}`).join(', ')}>
          {scores.map((score, i) => (
            <View key={days[i]} style={styles.chartColumn}>
              <View style={{ height: score, width: '100%', maxWidth: 50, borderRadius: radius.control, backgroundColor: i === 5 ? action.primary : action.accentSurface }} />
              <Text variant="caption" tone="muted">{days[i]}</Text>
            </View>
          ))}
        </View>
      </Card>
      <Card style={styles.listItem}>
        <Clock3 size={21} color={colors.mutedText} />
        <View style={styles.grow}>
          <Text variant="label">Alarma de la mañana</Text>
          <Text variant="caption" tone="muted">{alarm ? 'Activada en la demo' : 'Desactivada en la demo'}</Text>
        </View>
        <Switch accessibilityLabel="Alarma de la mañana" value={alarm} onValueChange={setAlarm}
          trackColor={{ false: colors.controlBorder, true: action.primary }} thumbColor={alarm ? action.onPrimary : colors.surface} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  feature: { minHeight: 202, overflow: 'hidden', justifyContent: 'center' },
  featureCopy: { gap: 7, alignItems: 'flex-start' },
  featureActions: { flexDirection: 'row', marginTop: 6 },
  orbit: { position: 'absolute', right: -3, top: -12, width: 292, height: 234 },
  orbitCompact: { right: -105, top: -20, opacity: 0.35 },
  orbitIcon: { position: 'absolute', left: 123, top: 92 },
  eyebrow: { letterSpacing: 1.8, fontWeight: '700' },
  stack: { gap: 16 },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { flex: 1, minWidth: 130, gap: 6 },
  inline: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWell: { height: 38, width: 38, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  grow: { flex: 1, minWidth: 0 },
  movementCard: { gap: 18 },
  chart: { flexDirection: 'row', alignItems: 'flex-end', minHeight: 125, gap: 8 },
  chartColumn: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 5 },
});

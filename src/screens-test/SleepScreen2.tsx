import { useContext, useState, type ReactNode } from 'react';
import { StyleSheet, Switch, useWindowDimensions, View } from 'react-native';
import {
    Activity, Clock3,
    Moon, Sun,
} from 'lucide-react-native';
import Svg, { Circle, Path, Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import { Button, Card, MetricCard, Text, useTheme } from '@jhohellsdl/native-ds';
import { MobileViewContext } from '../screens';

const white = '#FFFFFF';

function Feature({ eyebrow, title, detail, symbol, children }: {
    eyebrow: string; title: string; detail: string; symbol: ReactNode; children?: ReactNode;
}) {
    const { feature, radius } = useTheme();
    const isMobileFrame = useContext(MobileViewContext);
    const compact = isMobileFrame || useWindowDimensions().width < 600;
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
export function SleepScreen2() {
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

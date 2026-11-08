import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ArrowRight, Layers3, Search, Sparkles } from 'lucide-react-native';
import { Badge, Button, Card, IconButton, MetricCard, Text, TextField, useTheme } from '@jdl/native-ds';

export function ComponentCatalog() {
  const { colors, action, radius, feature } = useTheme();
  const [feedback, setFeedback] = useState('Prueba una de las acciones.');
  const swatches = [
    ['Fondo', colors.canvas],
    ['Superficie', colors.surface],
    ['Texto', colors.text],
    ['Acción', action.primary],
    ['Sobre acción', action.onPrimary],
    ['Acento suave', action.accentSurface],
  ];
  return (
    <View style={styles.stack}>
      <Card style={styles.stack}>
        <Text variant="subtitle" accessibilityRole="header">Tokens del tema</Text>
        <View style={styles.wrap}>
          {swatches.map(([label, value]) => (
            <View key={label} style={styles.swatch}>
              <View style={{ backgroundColor: value, height: 36, borderRadius: radius.control, borderColor: colors.border, borderWidth: 1 }} />
              <Text variant="label">{label}</Text>
              <Text variant="caption" tone="muted">{value}</Text>
            </View>
          ))}
        </View>
        <Text variant="caption" tone="muted">Gradiente destacado · {feature.gradient.join(' → ')}</Text>
      </Card>
      <Card style={styles.stack}>
        <Text variant="subtitle" accessibilityRole="header">Acciones</Text>
        <View style={styles.wrap}>
          <Button label="Primario" onPress={() => setFeedback('Acción primaria ejecutada.')} icon={(color) => <ArrowRight size={17} color={color} />} />
          <Button label="Secundario" variant="secondary" onPress={() => setFeedback('Acción secundaria ejecutada.')} />
          <Button label="Sutil" variant="ghost" onPress={() => setFeedback('Acción sutil ejecutada.')} />
          <Button label="Cargando" loading />
          <Button label="Deshabilitado" disabled />
          <IconButton label="Destacar" onPress={() => setFeedback('Acción de ícono ejecutada.')} icon={(color) => <Sparkles size={18} color={color} />} />
        </View>
        <Text variant="caption" tone="muted" accessibilityLiveRegion="polite">{feedback}</Text>
      </Card>
      <Card style={styles.stack}>
        <Text variant="subtitle" accessibilityRole="header">Formularios y estados</Text>
        <TextField label="Búsqueda" placeholder="Escribe para probar el campo" icon={(color) => <Search size={18} color={color} />} />
        <TextField label="Correo" defaultValue="correo@" autoCapitalize="none" keyboardType="email-address" error="Ingresa una dirección válida." />
        <View style={styles.wrap}>
          <Badge label="Neutral" />
          <Badge label="Información" tone="accent" />
          <Badge label="Confirmado" tone="success" />
          <Badge label="Requiere atención" tone="danger" />
        </View>
      </Card>
      <View style={styles.wrap}>
        <MetricCard label="Ejemplo de métrica" value="24" detail="Elementos activos" icon={(color) => <Layers3 size={18} color={color} />} />
        <Card style={{ flex: 1, gap: 4 }}>
          <Text variant="subtitle">Título</Text>
          <Text>Cuerpo de texto</Text>
          <Text variant="caption" tone="muted">Información secundaria</Text>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 14 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: 8 },
  swatch: { flexGrow: 1, flexBasis: 85, gap: 3 },
});

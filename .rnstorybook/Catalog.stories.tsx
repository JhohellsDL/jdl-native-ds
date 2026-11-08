import { View } from 'react-native';
import { HeartPulse, Search } from 'lucide-react-native';
import { Badge, Card, IconButton, MetricCard, Text, TextField } from '@jdl/native-ds';
import { ComponentCatalog } from '../src/ComponentCatalog';

export default { title: 'Componentes/Catálogo' };

export const Todos = { render: () => <ComponentCatalog /> };
export const Texto = { render: () => <View style={{ gap: 8 }}>
  <Text variant="display">Display</Text><Text variant="title">Título</Text>
  <Text variant="subtitle">Subtítulo</Text><Text>Cuerpo</Text><Text variant="caption" tone="muted">Texto secundario</Text>
</View> };
export const Icono = { render: () => <IconButton label="Salud" icon={(color) => <HeartPulse color={color} size={18} />} /> };
export const Tarjetas = { render: () => <View style={{ gap: 8 }}>
  <Card><Text>Superficie</Text></Card><Card tone="muted"><Text>Superficie alternativa</Text></Card>
  <MetricCard label="Calidad" value="80 / 100" detail="Métrica de ejemplo" />
</View> };
export const Campos = { render: () => <View style={{ gap: 8 }}>
  <TextField label="Buscar" placeholder="Escribe para probar" icon={(color) => <Search color={color} size={18} />} />
  <TextField label="Correo" error="Ingresa un correo válido." defaultValue="correo@" />
</View> };
export const Etiquetas = { render: () => <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
  <Badge label="Neutral" /><Badge label="Acento" tone="accent" />
  <Badge label="Confirmado" tone="success" /><Badge label="Error" tone="danger" />
</View> };

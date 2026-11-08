# JDL Native DS

Sistema de diseño agnóstico y de alto rendimiento para **React Native** y **TypeScript**.

El repositorio contiene:
* **`@jdl/native-ds`**: Paquete de UI puro, compilado a JavaScript estándar (`dist/`) con tipado estricto `.d.ts`. Cero dependencia de Expo.
* **Laboratorio interactivo (Vite + React Native Web)**: Entorno ultraligero que inicia en menos de un segundo para previsualizar componentes, demos y tokens en tiempo real.
* **Suite de contrastes y accesibilidad**: Pruebas automáticas de ratio de contraste WCAG para los diez temas (5 paletas × 2 modos).

---

## 🚀 Arranque rápido del laboratorio

Usa Node.js 22 LTS o superior y pnpm. Desde la raíz del repositorio:

```bash
pnpm install
pnpm dev
```

Abre automáticamente en `http://localhost:5173`. Podrás explorar el catálogo completo de componentes y las pantallas interactivas de demostración (Salud, Billetera, Descanso) con cambio dinámico de tema y modo (Claro / Oscuro).

| Comando | Acción |
| --- | --- |
| `pnpm dev` / `pnpm start` | Inicia el laboratorio web con recarga instantánea (< 1s) |
| `pnpm build` | Compila la librería `@jdl/native-ds` a `packages/ui/dist` |
| `pnpm build:lab` | Genera el bundle de producción web del laboratorio en `dist/` |
| `pnpm check:themes` | Ejecuta la suite de verificación de contrastes en terminal |
| `pnpm typecheck` | Comprueba tipos con TypeScript en todo el monorepo |

---

## 📦 Cómo usar la librería en tu aplicación

El paquete `@jdl/native-ds` es **100% agnóstico**: funciona en proyectos de **React Native CLI (Bare)**, **Expo**, **Next.js** o **React Native Web**.

### 1. Empaquetar o instalar

Para generar un tarball local desde el monorepo:

```bash
pnpm build
pnpm --filter @jdl/native-ds pack
```

En la app que consumirá el diseño:

```bash
pnpm add /ruta/a/jdl-native-ds-0.1.0.tgz
# o con npm:
# npm install /ruta/a/jdl-native-ds-0.1.0.tgz
# o cuando esté publicado en npm:
# pnpm add @jdl/native-ds
```

### 2. Implementación

Envuelve la aplicación con `ThemeProvider`:

```tsx
import React from 'react';
import { ThemeProvider, Button, Card, Text } from '@jdl/native-ds';

export default function App() {
  return (
    <ThemeProvider palette="cobalt" mode="system">
      <Card tone="surface">
        <Text variant="title">Bienvenido a JDL Native DS</Text>
        <Button label="Comenzar" onPress={() => console.log('Presionado')} />
      </Card>
    </ThemeProvider>
  );
}
```

---

## 🏗️ Estructura del repositorio

```text
jdl-native-ds/
├── packages/
│   └── ui/                     # Librería @jdl/native-ds
│       ├── dist/               # Salida compilada (JS plano + .d.ts) para React Native CLI
│       ├── src/                # Código fuente (TypeScript)
│       │   ├── theme.ts        # 5 paletas (Cobalt, Iris, Rose, Amber, Graphite), tokens y tipografía
│       │   ├── ThemeProvider.tsx # Contexto y hook useTheme()
│       │   ├── Buttons.tsx     # Button, IconButton
│       │   ├── Surfaces.tsx    # Card, Badge, MetricCard
│       │   ├── Text.tsx        # Tipografía con roles semánticos
│       │   └── TextField.tsx   # Input de texto con validación y estados
│       └── tsconfig.json       # Configuración de compilación del paquete
├── src/                        # Laboratorio interactivo (React Native Web)
│   ├── App.tsx                 # Shell del laboratorio y navegación
│   ├── ComponentCatalog.tsx    # Catálogo visual de tokens y componentes
│   └── screens.tsx             # Pantallas de demostración
├── checks/                     # Pruebas de contraste y accesibilidad WCAG
└── vite.config.ts              # Configuración ultraligera de Vite
```

---

## 🎨 Paletas incluidas

El sistema cuenta con 5 paletas integradas:
* **Cobalt** (Azul profundo de alta tecnología)
* **Iris** (Violeta / Indigo elegante)
* **Rose** (Tonos cálidos y vibrantes)
* **Amber** (Tonos dorados / energéticos)
* **Graphite** (Monocromático sobrio y minimalista)

Cada paleta implementa automáticamente los modos `light` y `dark` validados por los tests de contraste.

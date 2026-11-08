# JDL Native DS

Sistema de diseño personal para React Native y TypeScript. El repositorio contiene un paquete de UI reutilizable (`@jdl/native-ds`), un laboratorio interactivo y un Storybook nativo.

## Arranque rápido

Usa Node.js 22 LTS o superior y npm. Desde la raíz del repositorio:

```bash
npm ci
npm run web
```

Abre la dirección que muestra Expo. Elige una pantalla o entra a **Componentes**. Cambia la paleta y la apariencia desde el selector para ver el resultado en vivo.

| Comando | Qué abre |
| --- | --- |
| `npm run web` | Laboratorio en navegador |
| `npm run android` | Laboratorio en Android |
| `npm run ios` | Laboratorio en el simulador de iOS, en macOS |
| `npm run storybook:web` | Storybook en navegador |
| `npm run storybook:android` | Storybook en Android |
| `npm run storybook:ios` | Storybook en el simulador de iOS, en macOS |

El laboratorio utiliza Expo SDK 54. En móvil puedes usar una versión de Expo Go compatible con ese SDK o generar una build local con `npx expo run:android` o `npx expo run:ios`. Para ejecutar Storybook en una build local ya instalada, levanta el servidor con el script de Storybook de esa plataforma y abre la app contra ese servidor. Android requiere el entorno de Android Studio para compilar y iOS requiere macOS con Xcode.

## Qué puedes probar

| Demo | Interacciones |
| --- | --- |
| **Salud** | Filtrar servicios, elegir uno y ver la selección en la tarjeta de cita |
| **Billetera** | Ocultar el saldo, mostrarlo y abrir acciones de envío o recepción de ejemplo |
| **Descanso** | Cambiar entre noche y semana y activar o desactivar la alarma de ejemplo |
| **Componentes** | Comparar tokens, variantes de botones, estado de carga, campo con error y etiquetas de estado |

En Storybook, abre **Componentes / Button / Interactivo** para ajustar tamaño, variante, texto y estados en **Controls**. El selector dentro de la historia aplica el tema a la vista previa. Las tres pantallas están en **Pantallas / Demos**. Los datos y las interacciones de las pantallas son locales.

## Estructura

| Ruta | Responsabilidad |
| --- | --- |
| `packages/ui/src/theme.ts` | Cinco paletas con variantes claro y oscuro, tokens semánticos y escala tipográfica |
| `packages/ui/src/` | Proveedor y componentes públicos |
| `src/` | Laboratorio, selector de tema y pantallas de ejemplo |
| `.rnstorybook/` | Configuración, decorador temático e historias |
| `checks/` | Comprobaciones de contraste para los diez temas |

El kit exporta `Text`, `Button`, `IconButton`, `TextField`, `Card`, `Badge` y `MetricCard`. Todos leen los tokens de `ThemeProvider`. Por ejemplo, el botón principal utiliza `action.primary` y `action.onPrimary`. Las cinco paletas definen esos mismos roles. La tipografía, los radios y el espaciado comparten un perfil minimalista.

Para agregar otra paleta, declara un identificador en `paletteNames` y completa sus dos modos en `palettes`. Los selectores y las pruebas incorporan la nueva entrada. Agrega una variante si cambia el énfasis o el tamaño de un componente. Separa el componente si cambia su función o su contrato de interacción.

## Usar el paquete en otra app

Puedes generar un tarball local desde este repositorio:

```bash
npm pack --workspace @jdl/native-ds
```

En la raíz de la otra app React Native, instala el tarball con su ruta real:

```bash
npm install /ruta/a/jdl-native-ds-0.1.0.tgz
```

Envuelve la raíz de la app con el proveedor:

```tsx
import { Button, ThemeProvider } from '@jdl/native-ds';

export default function App() {
  return (
    <ThemeProvider palette="iris" mode="system">
      <Button label="Continuar" onPress={() => console.log('Continuar')} />
    </ThemeProvider>
  );
}
```

`mode` acepta `light`, `dark` y `system`. El paquete publica código fuente TypeScript para que Metro lo transpile. Expo, Storybook, los íconos y los gradientes son dependencias del laboratorio. El paquete de UI utiliza React y React Native.

## Verificación local

```bash
npm run typecheck
npm run check:themes
npm run build:web
npm run build:storybook:web
```

Las exportaciones estáticas quedan en `dist/` y `dist-storybook/`. Para abrirlas localmente, sirve la carpeta por HTTP, por ejemplo con `python3 -m http.server 8080 --directory dist`.

[Documentación de Storybook para React Native](https://storybookjs.github.io/react-native/docs/intro/getting-started/)

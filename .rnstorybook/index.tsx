import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';
import { view } from './storybook.requires';

const Storybook = view.getStorybookUI({
  shouldPersistSelection: false,
  enableWebsockets: false,
  initialSelection: { kind: 'Componentes/Button', name: 'Interactivo' },
});

registerRootComponent(Storybook);

import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from '@jdl/native-ds';

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { label: 'Continuar', variant: 'primary', size: 'md', disabled: false, loading: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost'] },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
export const Interactivo: StoryObj<typeof meta> = {};
export const Cargando: StoryObj<typeof meta> = { args: { loading: true } };

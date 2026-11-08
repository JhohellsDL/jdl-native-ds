import type { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['./*.stories.tsx'],
  deviceAddons: ['@storybook/addon-ondevice-controls'],
};

export default main;

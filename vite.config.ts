import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
    __DEV__: JSON.stringify(true),
  },
  resolve: {
    alias: [
      {
        find: 'react-native/Libraries/Utilities/codegenNativeComponent',
        replacement: path.resolve(__dirname, 'src/shims/codegenNativeComponent.js'),
      },
      {
        find: 'react-native-svg',
        replacement: 'react-native-svg/lib/module/ReactNativeSVG.web.js',
      },
      {
        find: /^react-native$/,
        replacement: path.resolve(__dirname, 'src/shims/reactNativeWeb.js'),
      },
      {
        find: '@jhohellsdl/native-ds',
        replacement: path.resolve(__dirname, 'packages/ui/src'),
      },
      {
        find: '@jdl/native-ds',
        replacement: path.resolve(__dirname, 'packages/ui/src'),
      },
      {
        find: 'buffer',
        replacement: 'buffer/',
      },
    ],
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  optimizeDeps: {
    include: ['react-native-web', 'lucide-react-native'],
    esbuildOptions: {
      resolveExtensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
    },
  },
});

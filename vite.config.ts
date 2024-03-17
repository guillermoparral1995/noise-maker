/** @type {import('vite').UserConfig} */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    emptyOutDir: true,
    outDir: '../docs',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(
        __dirname,
        './src/components/shared/index.ts',
      ),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@types': path.resolve(__dirname, './src/types.ts'),
      '@mocks': path.resolve(__dirname, './__mocks__'),
    },
  },
  publicDir: '../public',
  base: './',
  plugins: [
    react({
      include: '**/*.{tsx}',
    }),
  ],
});

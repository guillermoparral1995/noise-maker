/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    emptyOutDir: true,
    outDir: '../docs',
    assetsDir: 'noise-maker/assets',
  },
  publicDir: '../public',

  plugins: [
    react({
      include: '**/*.{tsx}',
    }),
  ],
});

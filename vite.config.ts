/** @type {import('vite').UserConfig} */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    emptyOutDir: true,
    outDir: '../docs',
    assetsDir: 'assets',
  },
  publicDir: '../public',
  base: './',
  plugins: [
    react({
      include: '**/*.{tsx}',
    }),
  ],
});

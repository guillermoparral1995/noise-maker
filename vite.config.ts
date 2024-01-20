import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../docs',
  },
  publicDir: '../public',
  plugins: [
    react({
      include: '**/*.{tsx}',
    }),
  ],
});

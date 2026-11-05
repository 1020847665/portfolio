import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = (name) => path.resolve(__dirname, `../../packages/${name}/src`);

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
  resolve: {
    alias: {
      '@portfolio/shared': pkg('shared'),
      '@portfolio/ui': pkg('ui'),
      '@portfolio/scenes': pkg('scenes'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: path.resolve(__dirname, 'src/test/setup.ts'),
    cache: false,
  },
});

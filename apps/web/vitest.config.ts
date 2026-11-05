import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = (name: string) => path.resolve(__dirname, `../../packages/${name}/src`);

export default defineConfig({
  plugins: [react()],
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
  },
});

import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/scenes/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0f',
        panel: '#12121c',
        line: '#23233a',
        neon: {
          cyan: '#00e5ff',
          violet: '#7c5cff',
          pink: '#ff4ecd',
          lime: '#8dff6f',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

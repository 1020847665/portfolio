import type { Config } from 'tailwindcss';

/**
 * Linear 精修质感设计令牌
 * 依据 design.md（VoltAgent/awesome-design-md · Linear-design-analysis）：
 * - canvas #010102 近纯黑微蓝底，四级 surface 阶梯承载层级（不用阴影）
 * - 单一彩色点缀：薰衣草蓝 primary #5e6ad2（仅品牌/主 CTA/焦点环/链接强调）
 * - 发丝线 hairline 边框；按钮/输入 8px 圆角，卡片 12px，截图面板 16px
 */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/scenes/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#010102',
        surface: {
          1: '#0f1011',
          2: '#141516',
          3: '#18191a',
          4: '#191a1b',
        },
        line: '#23252a',
        'line-strong': '#34343a',
        'line-tertiary': '#3e3e44',
        ink: '#f7f8f8',
        'ink-muted': '#d0d6e0',
        'ink-subtle': '#8a8f98',
        'ink-tertiary': '#62666d',
        primary: {
          DEFAULT: '#5e6ad2',
          hover: '#828fff',
          focus: '#5e69d1',
        },
      },
      fontFamily: {
        display: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Inter"',
          'system-ui',
          'sans-serif',
        ],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;

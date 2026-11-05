import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // transpile workspace 包（内部源码直接引用）
  transpilePackages: ['@portfolio/shared', '@portfolio/ui', '@portfolio/scenes'],
};

export default nextConfig;

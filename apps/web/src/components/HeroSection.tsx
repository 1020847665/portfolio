'use client';

import { lazy, Suspense } from 'react';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { StaticHero } from '@portfolio/scenes';

const GalaxyScene = lazy(() =>
  import('@portfolio/scenes').then((m) => ({ default: m.GalaxyScene })),
);
const NebulaScene = lazy(() =>
  import('@portfolio/scenes').then((m) => ({ default: m.NebulaScene })),
);

/**
 * 首屏 Hero：Linear display-lg 排版（56px 级 600 字重、-1.8px 级负字距）
 * 场景由设备分级决定，low 档零 three 依赖
 */
export function HeroSection() {
  const tier = useDeviceTier();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {tier === 'high' && (
        <Suspense fallback={null}>
          <GalaxyScene />
        </Suspense>
      )}
      {tier === 'mid' && (
        <Suspense fallback={null}>
          <NebulaScene />
        </Suspense>
      )}
      {tier === 'low' && <StaticHero />}

      <div className="relative z-10 text-center px-6">
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-ink">
          开发者 · 创造者
        </h1>
        <p className="mt-5 font-mono text-sm md:text-base text-ink-subtle">
          用代码构建体验，用数学创造美
        </p>
      </div>
    </section>
  );
}

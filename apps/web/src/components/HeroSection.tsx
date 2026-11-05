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
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
          开发者 · 创造者
        </h1>
        <p className="mt-4 font-mono text-sm md:text-base text-slate-400">
          用代码构建体验，用数学创造美
        </p>
      </div>
    </section>
  );
}

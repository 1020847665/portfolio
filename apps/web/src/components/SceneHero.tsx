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
const AttractorScene = lazy(() =>
  import('@portfolio/scenes').then((m) => ({ default: m.AttractorScene })),
);
const StylizedScene = lazy(() =>
  import('@portfolio/scenes').then((m) => ({ default: m.StylizedScene })),
);

/** 场景语义 → 分类主题色（与 CATEGORIES.accent 对应） */
export type SceneKind = 'galaxy' | 'nebula' | 'attractor' | 'stylized';

const KIND_MAP: Record<
  SceneKind,
  { high: 'galaxy' | 'attractor' | 'stylized' | 'nebula'; mid: 'nebula' | 'stylized' }
> = {
  galaxy: { high: 'galaxy', mid: 'nebula' },
  attractor: { high: 'attractor', mid: 'stylized' },
  stylized: { high: 'stylized', mid: 'nebula' },
  nebula: { high: 'nebula', mid: 'nebula' },
};

export function SceneHero({ kind = 'galaxy' }: { kind?: SceneKind }) {
  const tier = useDeviceTier();
  const pick = KIND_MAP[kind];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {tier === 'high' && (
        <Suspense fallback={null}>
          {pick.high === 'galaxy' && <GalaxyScene />}
          {pick.high === 'attractor' && <AttractorScene />}
          {pick.high === 'stylized' && <StylizedScene />}
          {pick.high === 'nebula' && <NebulaScene />}
        </Suspense>
      )}
      {tier === 'mid' && (
        <Suspense fallback={null}>
          {pick.mid === 'nebula' && <NebulaScene />}
          {pick.mid === 'stylized' && <StylizedScene />}
        </Suspense>
      )}
      {tier === 'low' && <StaticHero />}
    </div>
  );
}

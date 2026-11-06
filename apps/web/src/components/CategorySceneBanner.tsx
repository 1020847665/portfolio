'use client';

import { lazy, Suspense } from 'react';
import type { SceneKind } from './SceneHero';

const AttractorScene = lazy(() =>
  import('@portfolio/scenes').then((m) => ({ default: m.AttractorScene })),
);
const StylizedScene = lazy(() =>
  import('@portfolio/scenes').then((m) => ({ default: m.StylizedScene })),
);

/**
 * 分类页顶部场景横幅：
 * - lab → 混沌吸引子；art → 神经风格化
 * - Linear 式克制：去掉彩色辉光，只保留 hairline 边框 + surface-1 面板
 * - 纯装饰性视觉，aria-hidden；场景加载失败由 SceneCanvas 内部降级
 */
export function CategorySceneBanner({ kind }: { kind: SceneKind }) {
  return (
    <div
      className="relative h-40 md:h-52 mb-10 rounded-2xl overflow-hidden border border-line bg-surface-1"
      aria-hidden
    >
      <Suspense fallback={<div className="absolute inset-0 bg-surface-1" />}>
        {kind === 'attractor' && <AttractorScene />}
        {kind === 'stylized' && <StylizedScene />}
      </Suspense>
    </div>
  );
}

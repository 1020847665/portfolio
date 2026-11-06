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
 * - lab → 混沌吸引子（荧光绿轨迹）；art → 神经风格化（洋红流场）
 * - 纯装饰性视觉，aria-hidden；高度受限（160px），不打断列表阅读
 * - 场景加载失败由 SceneCanvas 内部降级为渐变色块
 */
export function CategorySceneBanner({
  kind,
  accent,
}: {
  kind: SceneKind;
  accent: string;
}) {
  return (
    <div
      className="relative h-40 md:h-52 mb-8 rounded-xl overflow-hidden border border-line"
      style={{ boxShadow: `0 0 60px -20px ${accent}` }}
      aria-hidden
    >
      <Suspense fallback={<div className="absolute inset-0 bg-panel" />}>
        {kind === 'attractor' && <AttractorScene />}
        {kind === 'stylized' && <StylizedScene />}
      </Suspense>
    </div>
  );
}

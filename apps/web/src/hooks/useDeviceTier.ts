import { useEffect, useState } from 'react';

export type DeviceTier = 'high' | 'mid' | 'low';

export const MOBILE_WIDTH = 768;

export function detectDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') return 'low';

  const prefersReducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'low';

  if (window.innerWidth < MOBILE_WIDTH) return 'low';

  const nav = navigator as Navigator & { gpu?: unknown };
  if ('gpu' in nav && nav.gpu && typeof nav.gpu === 'object') return 'high';

  try {
    const canvas = document.createElement('canvas');
    if (canvas.getContext('webgl2')) return 'mid';
  } catch {
    // canvas 创建失败视作无 GPU 能力
  }
  return 'low';
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('low');

  useEffect(() => {
    setTier(detectDeviceTier());
  }, []);

  return tier;
}

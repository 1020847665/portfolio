import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDeviceTier } from './useDeviceTier';

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

function setWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, value: width });
}

function mockNavigatorGpu(hasGpu: boolean) {
  Object.defineProperty(navigator, 'gpu', {
    configurable: true,
    value: hasGpu ? { requestAdapter: vi.fn().mockResolvedValue({}) } : undefined,
  });
}

function mockWebGL2(supported: boolean) {
  const orig = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type: string) {
    if (type === 'webgl2') return supported ? ({} as WebGL2RenderingContext) : null;
    return null;
  } as typeof orig;
}

describe('useDeviceTier', () => {
  beforeEach(() => {
    setWidth(1280);
    mockMatchMedia(false);
    mockNavigatorGpu(false);
    mockWebGL2(false);
  });

  it('reduced-motion 用户始终为 low', () => {
    mockMatchMedia(true);
    mockNavigatorGpu(true);
    const { result } = renderHook(() => useDeviceTier());
    expect(result.current).toBe('low');
  });

  it('移动端（宽度 < 768）为 low', () => {
    setWidth(375);
    mockNavigatorGpu(true);
    const { result } = renderHook(() => useDeviceTier());
    expect(result.current).toBe('low');
  });

  it('桌面 + WebGPU 可用 → high', () => {
    mockNavigatorGpu(true);
    mockWebGL2(true);
    const { result } = renderHook(() => useDeviceTier());
    expect(result.current).toBe('high');
  });

  it('桌面 + 仅 WebGL2 → mid', () => {
    mockNavigatorGpu(false);
    mockWebGL2(true);
    const { result } = renderHook(() => useDeviceTier());
    expect(result.current).toBe('mid');
  });

  it('桌面 + 无 GPU 能力 → low', () => {
    const { result } = renderHook(() => useDeviceTier());
    expect(result.current).toBe('low');
  });
});

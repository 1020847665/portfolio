import { describe, it, expect } from 'vitest';
import {
  buildGalaxyAttributes,
  GALAXY_CONFIG,
} from './galaxyMath';
import { buildAttractorPoints, LORENZ_PRESET } from './attractorMath';

describe('galaxyMath（纯函数，SSR 安全）', () => {
  it('生成指定数量的粒子属性（position + color）', () => {
    const attrs = buildGalaxyAttributes({ count: 1000, seed: 42 });
    expect(attrs.positions).toHaveLength(1000 * 3);
    expect(attrs.colors).toHaveLength(1000 * 3);
  });

  it('相同 seed 输出确定（可测试性）', () => {
    const a = buildGalaxyAttributes({ count: 200, seed: 7 });
    const b = buildGalaxyAttributes({ count: 200, seed: 7 });
    expect(a.positions).toEqual(b.positions);
  });

  it('旋臂结构：内圈占比高于外圈（对数螺线密度特征）', () => {
    const { positions } = buildGalaxyAttributes({ count: 5000, seed: 1 });
    let inner = 0;
    let outer = 0;
    for (let i = 0; i < positions.length; i += 3) {
      const r = Math.hypot(positions[i], positions[i + 2]);
      if (r < 2) inner++;
      if (r > 6) outer++;
    }
    expect(inner).toBeGreaterThan(outer);
  });

  it('颜色落在青-紫渐变域（R 分量整体低于 B 分量）', () => {
    const { colors } = buildGalaxyAttributes({ count: 2000, seed: 3 });
    let sumR = 0;
    let sumB = 0;
    for (let i = 0; i < colors.length; i += 3) {
      sumR += colors[i];
      sumB += colors[i + 2];
    }
    expect(sumB).toBeGreaterThan(sumR);
  });

  it('默认配置未超设备分级预算', () => {
    expect(GALAXY_CONFIG.count).toBeLessThanOrEqual(120_000);
    expect(GALAXY_CONFIG.count).toBeGreaterThan(10_000);
  });
});

describe('attractorMath（混沌吸引子积分，纯函数）', () => {
  it('Lorenz 预设参数正确', () => {
    expect(LORENZ_PRESET.sigma).toBe(10);
    expect(LORENZ_PRESET.rho).toBe(28);
    expect(LORENZ_PRESET.beta).toBe(8 / 3);
  });

  it('积分产生指定数量点且轨迹有界（混沌但收敛在吸引域内）', () => {
    const pts = buildAttractorPoints({ preset: LORENZ_PRESET, steps: 4000, dt: 0.004, seed: 5 });
    expect(pts).toHaveLength(4000 * 3);
    let maxR = 0;
    for (let i = 0; i < pts.length; i += 3) {
      maxR = Math.max(maxR, Math.hypot(pts[i], pts[i + 1], pts[i + 2]));
    }
    expect(maxR).toBeLessThan(80); // Lorenz 吸引域
  });

  it('相同 seed 轨迹确定', () => {
    const a = buildAttractorPoints({ preset: LORENZ_PRESET, steps: 500, dt: 0.004, seed: 9 });
    const b = buildAttractorPoints({ preset: LORENZ_PRESET, steps: 500, dt: 0.004, seed: 9 });
    expect(a).toEqual(b);
  });
});

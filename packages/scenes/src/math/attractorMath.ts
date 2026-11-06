import { mulberry32 } from './rng';

export interface AttractorPreset {
  /** 系统名（展示用） */
  name: string;
  sigma: number;
  rho: number;
  beta: number;
}

export const LORENZ_PRESET: AttractorPreset = {
  name: 'Lorenz',
  sigma: 10,
  rho: 28,
  beta: 8 / 3,
};

export interface AttractorParams {
  preset: AttractorPreset;
  steps: number;
  dt: number;
  seed: number;
}

/**
 * Lorenz 系统四阶 Runge-Kutta 积分：
 *   dx = σ(y - x)   dy = x(ρ - z) - y   dz = xy - βz
 * 返回 length = steps * 3 的交错坐标数组（混沌但被吸引域约束）。
 */
export function buildAttractorPoints(params: AttractorParams): number[] {
  const { preset, steps, dt, seed } = params;
  const rng = mulberry32(seed);

  // 初始条件在吸引域附近（避免长暂态）
  let x = 0.1 + rng() * 0.2;
  let y = 0.1 + rng() * 0.2;
  let z = 20 + rng() * 5;

  const pts: number[] = new Array(steps * 3);

  const deriv = (px: number, py: number, pz: number): [number, number, number] => [
    preset.sigma * (py - px),
    px * (preset.rho - pz) - py,
    px * py - preset.beta * pz,
  ];

  for (let i = 0; i < steps; i++) {
    const i3 = i * 3;
    pts[i3] = x;
    pts[i3 + 1] = y;
    pts[i3 + 2] = z;

    // RK4
    const [a1, b1, c1] = deriv(x, y, z);
    const [a2, b2, c2] = deriv(x + (dt / 2) * a1, y + (dt / 2) * b1, z + (dt / 2) * c1);
    const [a3, b3, c3] = deriv(x + (dt / 2) * a2, y + (dt / 2) * b2, z + (dt / 2) * c2);
    const [a4, b4, c4] = deriv(x + dt * a3, y + dt * b3, z + dt * c3);

    x += (dt / 6) * (a1 + 2 * a2 + 2 * a3 + a4);
    y += (dt / 6) * (b1 + 2 * b2 + 2 * b3 + b4);
    z += (dt / 6) * (c1 + 2 * c2 + 2 * c3 + c4);
  }

  return pts;
}

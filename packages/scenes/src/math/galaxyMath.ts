import { mulberry32, gaussian } from './rng';

export interface GalaxyConfig {
  /** 粒子总量（设备分级预算：high 档 ≤12 万） */
  count: number;
  /** 星系半径（世界单位） */
  radius: number;
  /** 旋臂数 */
  arms: number;
  /** 确定性种子 */
  seed: number;
}

export const GALAXY_CONFIG: GalaxyConfig = {
  count: 110_000,
  radius: 8,
  arms: 3,
  seed: 1337,
};

export interface GalaxyAttributes {
  /** Float32Array，length = count * 3，xyz 交错 */
  positions: number[];
  /** Float32Array，length = count * 3，rgb 交错（青→紫渐变） */
  colors: number[];
  /** 每粒子尺寸（用于 shader 点大小衰减） */
  sizes: number[];
}

/**
 * 对数螺线星系粒子分布：
 *   r = -radius * ln(1 - u) （中心密集、外缘稀疏）
 *   θ = armOffset + r * spin + 高斯散布（旋臂随半径展开）
 *   y 厚度随半径衰减（核球凸、盘面薄）
 */
export function buildGalaxyAttributes(cfg: Partial<GalaxyConfig> = {}): GalaxyAttributes {
  const { count, radius, arms, seed } = { ...GALAXY_CONFIG, ...cfg };
  const rng = mulberry32(seed);

  const positions: number[] = new Array(count * 3);
  const colors: number[] = new Array(count * 3);
  const sizes: number[] = new Array(count);

  // 主题色板：内圈青 (#00e5ff) → 外圈紫 (#7c5cff)，少量粉色恒星点缀
  const inner = [0.0, 0.9, 1.0];
  const outer = [0.49, 0.36, 1.0];
  const pink = [1.0, 0.31, 0.8];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // 半径：指数分布偏内核（尺度 2.6 → 中位半径约 1.8，内圈致密外圈稀疏）
    const u = rng();
    const r = -2.6 * Math.log(1 - u * 0.985); // 截断避免无穷大

    // 旋臂：对数螺线 + 随半径增大的角向散布
    const armIndex = i % arms;
    const armOffset = (armIndex / arms) * Math.PI * 2;
    const spin = r * 0.9;
    const spread = gaussian(rng) * (0.18 + r * 0.06);
    const branchAngle = armOffset + spin + spread;

    // 垂直厚度：核球厚、盘面薄
    const thickness = Math.exp(-r / (radius * 0.45)) * 0.9 + 0.06;
    const y = gaussian(rng) * thickness * 0.5;

    positions[i3] = Math.cos(branchAngle) * r + gaussian(rng) * 0.12;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.sin(branchAngle) * r + gaussian(rng) * 0.12;

    // 颜色：按半径插值 + 3% 粉色恒星
    const t = Math.min(r / radius, 1);
    const isPink = rng() < 0.03;
    const c = isPink ? pink : [
      inner[0] + (outer[0] - inner[0]) * t,
      inner[1] + (outer[1] - inner[1]) * t,
      inner[2] + (outer[2] - inner[2]) * t,
    ];
    colors[i3] = c[0];
    colors[i3 + 1] = c[1];
    colors[i3 + 2] = c[2];

    sizes[i] = rng() * 0.6 + 0.2;
  }

  return { positions, colors, sizes };
}

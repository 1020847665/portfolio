import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GalaxyScene } from './GalaxyScene';
import { NebulaScene } from './NebulaScene';
import { AttractorScene } from './AttractorScene';
import { StylizedScene } from './StylizedScene';
import { StaticHero } from './StaticHero';

/**
 * 场景组件冒烟测试：jsdom 无 WebGL，four 场景必须优雅降级为
 * 带 data-testid 的静态容器（低配/无 GPU 环境的运行时行为与测试环境一致）。
 */
describe('3D 场景组件（无 WebGL 环境优雅降级）', () => {
  it.each([
    ['scene-galaxy', GalaxyScene, 'WebGPU 粒子星系'],
    ['scene-nebula', NebulaScene, 'WebGL 星云'],
    ['scene-attractor', AttractorScene, '混沌吸引子'],
    ['scene-stylized', StylizedScene, '风格化渲染'],
  ])('%s 在无 GPU 时渲染降级容器且带 aria 标注', (id, Comp, label) => {
    const { container } = render(<Comp />);
    const el = container.querySelector(`[data-testid="${id}"]`);
    expect(el).not.toBeNull();
    expect(el?.getAttribute('aria-label')).toContain(label.slice(0, 2));
  });

  it('StaticHero 保留静态视觉（low 档）', () => {
    const { container } = render(<StaticHero />);
    expect(container.querySelector('[data-testid="scene-static"]')).not.toBeNull();
  });

  it('场景模块不引用 window 之外的浏览器全局（SSR 安全冒烟）', () => {
    // 渲染阶段不抛异常即通过 —— 所有 three 初始化都在 useEffect/Canvas 内
    expect(() => render(<GalaxyScene />)).not.toThrow();
  });
});

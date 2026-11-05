import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

vi.mock('@portfolio/scenes', () => ({
  GalaxyScene: () => <div data-testid="scene-galaxy" />,
  NebulaScene: () => <div data-testid="scene-nebula" />,
  StaticHero: () => <div data-testid="scene-static" />,
}));
vi.mock('../hooks/useDeviceTier', () => ({
  useDeviceTier: vi.fn(),
}));

import { useDeviceTier } from '../hooks/useDeviceTier';

function mockTier(tier: 'high' | 'mid' | 'low') {
  vi.mocked(useDeviceTier).mockReturnValue(tier);
}

describe('HeroSection 按设备分级渲染', () => {
  it('high 档渲染 WebGPU 星系场景', async () => {
    mockTier('high');
    render(<HeroSection />);
    expect(await screen.findByTestId('scene-galaxy')).toBeInTheDocument();
    expect(screen.queryByTestId('scene-static')).not.toBeInTheDocument();
  });

  it('mid 档渲染 WebGL 降级场景', async () => {
    mockTier('mid');
    render(<HeroSection />);
    expect(await screen.findByTestId('scene-nebula')).toBeInTheDocument();
  });

  it('low 档渲染静态视觉，不加载任何 3D 场景', () => {
    mockTier('low');
    render(<HeroSection />);
    expect(screen.getByTestId('scene-static')).toBeInTheDocument();
    expect(screen.queryByTestId('scene-galaxy')).not.toBeInTheDocument();
    expect(screen.queryByTestId('scene-nebula')).not.toBeInTheDocument();
  });

  it('各档位都渲染标题文案', () => {
    mockTier('low');
    render(<HeroSection />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});

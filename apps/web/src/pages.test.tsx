import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';
import ProjectsPage from '../app/projects/page';
import NotFound from '../app/not-found';
import { HeroSection } from './components/HeroSection';

vi.mock('./scenes/GalaxyScene', () => ({
  GalaxyScene: () => <div data-testid="scene-galaxy" />,
}));

describe('Next.js 页面（SSR 组件树）', () => {
  it('首页渲染 5 屏段结构', () => {
    render(<HomePage />);
    expect(screen.getByTestId('page-home')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('开发者 · 创造者');
  });

  it('项目总览页渲染分类与项目卡片', () => {
    render(<ProjectsPage />);
    expect(screen.getByTestId('page-projects')).toBeInTheDocument();
    expect(screen.getByTestId('category-card-web')).toBeInTheDocument();
    expect(screen.getByTestId('project-card-bestwise-yls-platform')).toBeInTheDocument();
  });

  it('404 页渲染', () => {
    render(<NotFound />);
    expect(screen.getByTestId('page-404')).toBeInTheDocument();
  });

  it('HeroSection 默认 low 档渲染静态视觉（SSR 一致）', () => {
    render(<HeroSection />);
    expect(screen.getByTestId('scene-static')).toBeInTheDocument();
  });
});

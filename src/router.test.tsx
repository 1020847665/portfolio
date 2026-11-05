import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('路由', () => {
  it('首页渲染', () => {
    renderAt('/');
    expect(screen.getByTestId('page-home')).toBeInTheDocument();
  });

  it('项目总览渲染', () => {
    renderAt('/projects');
    expect(screen.getByTestId('page-projects')).toBeInTheDocument();
  });

  it('分类页读取 category 参数', () => {
    renderAt('/projects/lab');
    expect(screen.getByTestId('page-category')).toHaveTextContent('lab');
  });

  it('详情页读取 slug 参数', () => {
    renderAt('/projects/web/demo-fullstack-app');
    expect(screen.getByTestId('page-detail')).toHaveTextContent('demo-fullstack-app');
  });

  it('关于页与联系页渲染', () => {
    renderAt('/about');
    expect(screen.getByTestId('page-about')).toBeInTheDocument();
  });

  it('未知路径显示 404', () => {
    renderAt('/no-such-page');
    expect(screen.getByTestId('page-404')).toBeInTheDocument();
  });
});

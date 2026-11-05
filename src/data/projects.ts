export type CategoryId = 'web' | '3d' | 'lab' | 'art';

export interface Category {
  id: CategoryId;
  title: string;
  subtitle: string;
  route: string;
  accent: string;
}

export interface Project {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  stack: string[];
  demo: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'web',
    title: 'Web 应用',
    subtitle: '全栈 / 系统工程',
    route: '/projects/web',
    accent: '#00e5ff',
  },
  {
    id: '3d',
    title: '3D / 创意编码',
    subtitle: 'Three.js / 生成艺术',
    route: '/projects/3d',
    accent: '#7c5cff',
  },
  {
    id: 'lab',
    title: '实验 Lab',
    subtitle: '原型 / 周末 hack',
    route: '/projects/lab',
    accent: '#8dff6f',
  },
  {
    id: 'art',
    title: '艺术 / 风格化',
    subtitle: '神经渲染 / 视觉实验',
    route: '/projects/art',
    accent: '#ff4ecd',
  },
];

export const projects: Project[] = [
  {
    slug: 'demo-fullstack-app',
    title: '演示 · 全栈应用',
    category: 'web',
    summary: '演示占位：一个全栈 Web 应用的展示卡片，后续替换为真实项目。',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    demo: true,
  },
  {
    slug: 'demo-shader-study',
    title: '演示 · Shader 学习场',
    category: '3d',
    summary: '演示占位：GLSL 着色器练习合集，后续替换为真实项目。',
    stack: ['Three.js', 'GLSL'],
    demo: true,
  },
  {
    slug: 'demo-attractor-lab',
    title: '演示 · 混沌吸引子实验',
    category: 'lab',
    summary: '演示占位：GPGPU 混沌系统可视化原型，后续替换为真实项目。',
    stack: ['WebGL2', 'GPGPU'],
    demo: true,
  },
  {
    slug: 'demo-style-transfer',
    title: '演示 · 风格化渲染实验',
    category: 'art',
    summary: '演示占位：实时风格化渲染尝试，后续替换为真实项目。',
    stack: ['Shader', 'ML'],
    demo: true,
  },
];

export function getProjectsByCategory(id: CategoryId): Project[] {
  return projects.filter((p) => p.category === id);
}

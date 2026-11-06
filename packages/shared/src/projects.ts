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
  /** GitHub 仓库地址（真实项目必有） */
  repo: string;
  /** 项目详情（渲染在详情页正文） */
  detail?: string;
  /** 年份 */
  year: string;
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

/** 站主真实资料（来源：GitHub 公开资料） */
export const PROFILE = {
  name: '疯狂的孩子',
  login: '1020847665',
  email: '1020847665@qq.com',
  github: 'https://github.com/1020847665',
  bio: '开发者。从前端到全栈，关注 Web 3D 与创意编程。',
} as const;

export const projects: Project[] = [
  {
    slug: 'bestwise-yls-platform',
    title: 'BestWise.YLS 企业级平台',
    category: 'web',
    summary:
      '企业级多端平台系统：平台管理端 + 资源服务 + 公共库的完整 Solution，C# 后端配合 ASP.NET 前端视图，JavaScript 占比最大（约 170 万字符）。',
    stack: ['C#', 'ASP.NET', 'JavaScript', 'CSS', '.sln 企业架构'],
    demo: false,
    repo: 'https://github.com/1020847665/test',
    year: '2020',
    detail:
      '一个完整的 .NET Solution（BestWise.YLS.Solution），包含三个子工程：平台管理端、平台资源服务、平台公共库。前端视图层以 JavaScript（约 1.7MB）+ CSS（440KB）+ HTML 构成业务界面，后端服务用 C#（约 890KB）实现。仓库按企业级 .sln 组织，含 packages 依赖目录，是典型的多人协作企业全栈项目样本。',
  },
  {
    slug: 'jquery-source-reading',
    title: 'jQuery 1.10.2 源码逐行解读',
    category: 'lab',
    summary:
      '对 jQuery 1.10.2 全部 11529 行源码逐段添加中文解读注释，附带冲突处理、Sizzle 选择器引擎等流程图，是深入框架内核的学习工程。',
    stack: ['JavaScript', '源码分析', '流程图'],
    demo: false,
    repo: 'https://github.com/1020847665/jQuery-',
    year: '2021',
    detail:
      '把 jQuery 1.10.2 完整源码（11529 行）逐行加上个人中文注释，覆盖架构与依赖模块、Sizzle 选择器引擎、冲突处理机制等核心模块，并手绘 flowChart 流程图（冲突处理流程、Sizzle 简易流程）与思维导图辅助理解。README 中整理了 Aaron、nuysoft 等社区经典源码分析系列作为参考资料。这种"逐行读源码"的练习方式，是理解框架设计思想的硬功夫。',
  },
  {
    slug: 'jianshu-demo-collection',
    title: '简书文章配套 Demo 集',
    category: 'lab',
    summary:
      '简书技术文章的全部配套代码：React 学习系列、Vue 案例、类库插件使用、小程序、数据库与 Node.js，共 10+ 主题目录。',
    stack: ['React', 'Vue', '微信小程序', 'Node.js', 'JavaScript'],
    demo: false,
    repo: 'https://github.com/1020847665/jianshu_demo',
    year: '2018',
    detail:
      '简书技术写作的配套代码仓库，按主题分目录组织：WEB 类库插件使用案例、WEB 需求问题解决、web 奇技淫巧、web 概念、React（learning react day 1/2 系列文章 + react-demo）、Vue、小程序、Node.js、数据库。语言构成 JavaScript 43KB + Vue 17KB + HTML 7KB，覆盖 2018 年前后前端社区的主流话题。',
  },
  {
    slug: 'cssrem-sublime-plugin',
    title: 'cssrem — px 转 rem 插件',
    category: 'web',
    summary:
      'Sublime Text 3 自动完成插件：输入 CSS 时实时把 px 值转换为 rem 值，移动端适配利器，Python 实现。',
    stack: ['Python', 'Sublime Text API', 'CSS 工程化'],
    demo: false,
    repo: 'https://github.com/1020847665/cssrem',
    year: '2017',
    detail:
      '一个 CSS 的 px 值转 rem 值的 Sublime Text 3 自动完成插件（Python 实现，3KB 核心代码）。输入 px 时自动补全对应 rem 值，支持配置换算比例（px_to_rem 默认 40）、rem 小数最大长度、启用文件类型（默认 .css/.less/.sass）。在移动端 rem 适配方案流行的年代，这是前端工程化提效的实用工具，仓库附带 GIF 效果演示。',
  },
  {
    slug: 'portfolio-site',
    title: 'Portfolio 作品集网站（本站）',
    category: '3d',
    summary:
      '你正在看的这个网站：Next.js 15 App Router + Monorepo + pnpm + Three.js，4 个自研 WebGL 场景，TDD 32 测试，SSR + 设备分级降级。',
    stack: ['Next.js 15', 'TypeScript', 'Three.js', 'GLSL', 'pnpm Monorepo', 'Vitest'],
    demo: false,
    repo: 'https://github.com/1020847665/portfolio',
    year: '2026',
    detail:
      '本作品集即是一个完整工程项目：pnpm Monorepo（apps/web + packages/{shared,ui,scenes}）统一 tsconfig/eslint；Next.js 15 App Router SSR（4 静态 + 2 动态路由）；Three.js 自研 4 个场景 —— 11 万粒子对数螺线星系（差速旋转）、Ray Marching 体积星云（fbm 噪声）、Lorenz 混沌吸引子（RK4 积分）、细胞噪声域扭曲风格化流场；设备三级降级（WebGPU/WebGL2/静态）；全流程 TDD 32 个测试。',
  },
];

export function getProjectsByCategory(id: CategoryId): Project[] {
  return projects.filter((p) => p.category === id);
}

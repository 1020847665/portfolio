# 实施计划

> 与 design.md 配套 · 任务粒度：每个任务可独立验证

## 环境事实（已探测）

- Node v22.22.2 / pnpm 8.15.4 / git 2.55.0（Windows，Git Bash）
- 工作区 F:/Claw/portfolio（Monorepo：apps/web + packages/{shared,ui,scenes}）

## 任务列表

- [x] T1 脚手架：Vite + React18 + TS + Tailwind3.4 + r3f8 + three0.169 + router7；Vitest/RTL/Playwright
- [x] T2 TDD·useDeviceTier：5 分支测试 → 实现通过
- [x] T3 TDD·项目数据：schema + 4 分类过滤 + 占位内容（测试在 shared 包）
- [x] T4 TDD·路由：6 类页面 + 404 + 动态参数
- [x] T5 TDD·Hero 条件渲染：high/mid/low 三档组件
- [x] T6 组件化重构：Section/Navbar/Footer + ProjectCard/CategoryCard + 4 个首页屏段组件
- [x] T6.5 Monorepo 改造（v1.1）：pnpm workspace + apps/web + packages/{shared,ui,scenes}；全局 tsconfig.base/eslint.config；import 全部改 @portfolio/*；20/20 测试全绿 + build 通过
- [ ] T7 移动端样式核查（375px 视口截图）
- [ ] T8 git 提交 monorepo 改造；待 Token 后推送 GitHub + 接 GitHub Pages Actions
- [ ] T9 交付检查：lint/test/build 全过、移动端降级验证、Playwright E2E 冒烟
- [ ] T10 真实 3D 场景实现：WebGPU 粒子星系（high）/ WebGL 降级（mid）/ 静态（low）

## 待外部输入（不阻塞 T7–T10）

- GitHub 用户名、PAT（repo 权限）→ T8 推送需要
- 真实项目内容 → 替换占位演示数据

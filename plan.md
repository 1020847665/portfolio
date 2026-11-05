# 实施计划

> 与 design.md 配套 · 任务粒度：每个任务可独立验证

## 环境事实（已探测）

- Node v22.22.2 / npm 10.9.7 / git 2.55.0（Windows，Git Bash）
- 工作区 F:/Claw/portfolio 新建

## 任务列表

- [ ] T1 脚手架：Vite + React18 + TS + Tailwind3.4 + r3f8 + three0.169 + router7；Vitest/RTL/Playwright；`npm test` 与 `npm run build` 基线通过
- [ ] T2 TDD·useDeviceTier：测试（reduced-motion / 移动端 / gpu / webgl2 各分支）→ 实现
- [ ] T3 TDD·项目数据：schema + 4 分类过滤 + 占位内容
- [ ] T4 TDD·路由：6 类页面，404 fallback，分类与详情参数
- [ ] T5 TDD·Hero 条件渲染：high/mid/low 三档组件，low 档断言 three 未加载
- [ ] T6 首页 5 屏段视觉 + Tailwind 主题（深空色系）
- [ ] T7 移动端样式核查（375px 视口截图）
- [ ] T8 git init + main 分支；待 Token 后推送 GitHub + 接 GitHub Pages Actions
- [ ] T9 交付检查：lint/test/build 全过、移动端降级验证、Playwright E2E 冒烟

## 待外部输入（不阻塞 T1–T7）

- GitHub 用户名、PAT（repo 权限）→ T8 需要
- 真实项目内容 → 替换占位演示数据

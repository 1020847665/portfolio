# 个人作品集网站 · 设计文档

> 版本 v1.0 · 2026-11-06 · 状态：已与需求方确认方向，进入实施

## 1. 定位

开发者个人网站，主打「创造」：展示项目、技术热情与创意实验。视觉辨识度优先于常规模板感。

## 2. 视觉方向

- 深空暗色底（#0a0a0f 系），霓虹点缀色按板块区分
- 标题无衬线粗体；标签/代码用等宽字体
- 动效：入场渐显、滚动视差、卡片悬浮微交互
- 尊重 `prefers-reduced-motion`：命中时全部动效降级为静态

## 3. 核心创意：效果与内容语义绑定（非纯炫技）

| # | 效果 | 绑定的内容 | 语义隐喻 |
|---|------|-----------|---------|
| 1 | WebGPU 计算着色器粒子星系 | 首屏 Hero；Web 应用板块 | 连接、规模、系统 |
| 2 | Ray Marching 体积星云 | 3D / 创意编码板块；精选作品背景 | 沉浸、探索、氛围 |
| 5 | GPGPU 混沌吸引子 | 实验板块（Lab）；关于页技能联动 | 混沌、数学、涌现 |
| 6 | 神经风格化渲染 | 艺术板块（Art） | 艺术、转化、独特视角 |

交互语义：
- Hero：鼠标即引力源，粒子随轨迹形成漩涡——「访客参与创造」
- 四板块：悬停激活对应效果，其余变暗——「每个方向有自己的宇宙」
- 关于页技能标签：悬停时吸引子形态参数变化——「技能是混沌系统的吸引子」

## 4. 页面规划（6 类模板）

| 页面 | 路由 | 内容 |
|---|---|---|
| 首页 | `/` | 5 屏段：Hero → 精选作品 → 创作方向（四板块）→ 关于 → 联系 |
| 项目总览 | `/projects` | 作品索引、分类筛选 |
| 分类作品 | `/projects/[category]` | 一套模板四种主题（web/3d/lab/art） |
| 项目详情 | `/projects/[slug]` | 背景、职责、技术栈、过程、链接 |
| 关于我 | `/about` | 介绍、技能、经历、探索方向 |
| 联系方式 | `/contact` | 邮箱、社交链接 |

博客不进第一版；项目无真实内容时放明确标注的演示占位。

## 5. 移动端策略（架构级，非事后适配）

- 同一套代码，组件按设备分级渲染，不做第二套站点
- 移动端完全不用 WebGL：静态渐变背景、静态 SVG 吸引子、CSS 轻动效、滚动视差
- 触控替代鼠标交互；布局单列优先

## 6. 技术架构

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | React 18 + TypeScript + Vite | SPA，部署 GitHub Pages |
| 样式 | Tailwind CSS v3.4 | 响应式断点，mobile-first |
| 3D | three v0.169 + @react-three/fiber v8 + drei | 按需 dynamic import |
| 路由 | react-router-dom v7（SPA 模式） | GitHub Pages 需 HashRouter 或 404 fallback |
| 测试 | Vitest + React Testing Library + Playwright | 单测 + E2E + 截图回归 |

### 6.1 设备分级（useDeviceTier）

```
high：桌面 + navigator.gpu 可用 → WebGPU 全效果
mid ：桌面 + WebGL2                → WebGL 降级版
low ：移动端 / 不支持者 / reduced-motion / 显存受限 → 静态视觉
```

判定顺序：reduced-motion → 移动端（宽 < 768 或触屏 UA）→ gpu 探测 → webgl2 探测。

### 6.2 条件渲染

```tsx
tier === 'high' → <WebGPUGalaxy />
tier === 'mid'  → <WebGLNebula />（简化粒子）
tier === 'low'  → <StaticHero />（零 three 依赖）
```

low 档不 import three（动态 import 隔离，bundle 分析验证）。

### 6.3 部署

- GitHub 仓库 `portfolio`（Public，main 分支）
- GitHub Actions：CI（lint + test + build）+ Pages 部署
- Token 由需求方后续提供；凭据不写入任何代码与配置文件

## 7. 测试策略（TDD）

- 功能逻辑（数据、路由、设备分级、筛选）→ Vitest + RTL，Red-Green-Refactor
- E2E：Playwright 跑桌面 Chromium + 移动视口关键路径
- 3D：验证场景可挂载、卸载资源释放、low 档不加载 three、降级链路不崩溃
- 视觉：截图回归；效果观感以实机验收为准

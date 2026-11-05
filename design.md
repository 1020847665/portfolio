# 个人作品集网站 · 设计文档

> 版本 v1.2 · 2026-11-06 · 状态：SSR（Next.js App Router）落地，全链路验证通过

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

### 6.0 Monorepo + pnpm（v1.1 变更）

工程采用 pnpm workspace 管理，统一规范、按领域拆包：

```
portfolio/
├── pnpm-workspace.yaml          # workspace 声明
├── tsconfig.base.json           # 全局 TS 基线（strict + paths 别名）
├── eslint.config.js             # 全局 ESLint flat config（typescript-eslint）
├── .npmrc                       # 私有包声明
├── apps/
│   └── web/                     # @portfolio/web — Next.js 15 App Router（SSR）
│       ├── app/                 # 文件路由：layout / page / not-found / projects/[category]/[slug]
│       └── src/                 # 客户端组件（'use client'：HeroSection、hooks）
└── packages/
    ├── shared/                  # @portfolio/shared — 类型、项目数据、设备分级常量（纯 TS，零 UI 依赖）
    ├── ui/                      # @portfolio/ui — 通用组件（next/link），依赖 shared + next
    └── scenes/                  # @portfolio/scenes — 3D 场景（three 独立隔离），仅被动态 import
```

统一工程规范：

| 规范 | 落点 |
|---|---|
| TypeScript | 根 `tsconfig.base.json`，各包 extends；`@portfolio/*` 路径别名 |
| ESLint | 根 `eslint.config.js` flat config，所有包共享；`pnpm -r lint` 递归执行 |
| 构建 | 各包 `pnpm -r build` 递归；web 负责最终产物 |
| 测试 | 各包 `pnpm -r test`；测试与其代码同包放置 |
| 依赖 | pnpm 严格隔离：ui/scenes 只声明自己用到的依赖；workspace 包用 `workspace:*` 协议 |

拆包收益：
- **three 隔离**：只有 `@portfolio/scenes` 依赖 three，移动端 low 档不加载该包（bundle 级保证，而非约定）
- **数据与 UI 分离**：项目数据、类型、设备常量在 shared，未来加博客/后台可直接复用
- **组件复用**：ui 包可被未来任何新 app（如文档站）引用

### 6.1 技术选型与渲染模式（v1.2：SSR）

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | **Next.js 15（App Router）** + React 19 + TypeScript | **服务端渲染 SSR** |
| 渲染策略 | 静态页 SSG（`/`、`/projects`、`/about`、`/contact`）+ 动态页 SSR（`/projects/[category]`、`/[slug]`） | 构建输出：4 静态 `○` + 2 动态 `ƒ` |
| 客户端组件 | `'use client'` 标注：HeroSection（3D 分档）、useDeviceTier | 3D 交互仅客户端水合后激活 |
| 样式 | Tailwind CSS v3.4 | mobile-first；content 扫描含 ui/scenes 包 |
| 3D | three v0.169 + @react-three/fiber v9（React 19 配套） | 仅 @portfolio/scenes 依赖，lazy 动态 import |
| 测试 | Vitest + React Testing Library + Playwright | 单测 + E2E；页面测试直接渲染 RSC 输出组件树 |
| 包管理 | pnpm 9 + workspace | 统一脚本：`pnpm dev / build / test / lint` |
| 部署 | **Vercel**（Next.js 官方平台，零配置） | 推送 GitHub 后自动 CI/CD；也可 Node 服务器自托管（`next start`） |

SSR 收益：
- **SEO**：首屏 HTML 由服务端输出完整内容（标题、项目列表），搜索引擎可直接索引
- **首屏性能**：用户先看到服务端渲染的静态内容，3D 场景水合后再激活，LCP 不被 WebGL 阻塞
- **设备分级在 SSR 安全**：服务端默认渲染 low 档静态视觉（测试已断言），客户端水合后按真实设备升级到 high/mid，无闪烁

### 6.2 设备分级（useDeviceTier）

```
high：桌面 + navigator.gpu 可用 → WebGPU 全效果
mid ：桌面 + WebGL2                → WebGL 降级版
low ：移动端 / 不支持者 / reduced-motion / 显存受限 → 静态视觉
```

判定顺序：reduced-motion → 移动端（宽 < 768 或触屏 UA）→ gpu 探测 → webgl2 探测。

### 6.3 条件渲染

```tsx
tier === 'high' → <WebGPUGalaxy />
tier === 'mid'  → <WebGLNebula />（简化粒子）
tier === 'low'  → <StaticHero />（零 three 依赖）
```

low 档不 import three（动态 import 隔离，bundle 分析验证）。

### 6.4 部署

- GitHub 仓库 `portfolio`（Public，main 分支）
- CI/CD：连接 Vercel 后推送 main 自动构建部署（Next.js 官方支持，无需自写 Actions）
- Token 由需求方后续提供；凭据不写入任何代码与配置文件

## 7. 测试策略（TDD）

- 功能逻辑（数据、路由、设备分级、筛选）→ Vitest + RTL，Red-Green-Refactor
- 测试放置：与被测代码同包（shared 测数据、web 测路由/组件/hook）
- E2E：Playwright 跑桌面 Chromium + 移动视口关键路径
- 3D：验证场景可挂载、卸载资源释放、low 档不加载 three、降级链路不崩溃
- 视觉：截图回归；效果观感以实机验收为准

## 8. 当前验证状态（v1.2）

| 检查项 | 结果 |
|---|---|
| pnpm install（5 个 workspace 项目，Next 15.5 + React 19） | 通过 |
| pnpm -r test | 18/18 全绿（shared 5 + web 13），0 未处理错误 |
| next build | 通过：4 静态页（○）+ 2 动态页（ƒ），首页 First Load JS 107KB |
| SSR 输出验证（next start + curl） | 首页/总览/分类页 HTML 均含服务端渲染内容（标题、卡片、testid），无效分类返回 404 |
| 环境备注 | 本机沙箱拦截 vitest 写系统 Temp 与 .next/trace：前者已补丁关闭 vitest 缓存，后者构建时加 NEXT_TRACE=0；均不影响 CI/其他环境 |

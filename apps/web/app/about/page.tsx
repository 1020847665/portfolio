import { Navbar, Footer } from '@portfolio/ui';
import { PROFILE, projects } from '@portfolio/shared';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main data-testid="page-about" className="px-6 md:px-12 py-24 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-8">关于我</h1>
        <p className="text-ink-subtle leading-relaxed mb-12">
          我是{PROFILE.name}（GitHub:{' '}
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-ink-muted hover:text-primary-hover underline decoration-line underline-offset-4 transition-colors"
          >
            @{PROFILE.login}
          </a>
          ），{PROFILE.bio}
        </p>

        <div className="space-y-10 text-ink-subtle leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-medium tracking-tight text-ink mb-3">
              路径
            </h2>
            <p>
              前端起步（Sublime 插件、jQuery 时代）→ 前端工程化与框架（React / Vue /
              小程序，简书技术写作）→ 框架内核（jQuery 1.10.2 全部 11529 行源码逐行中文解读）→
              企业级全栈（.NET 平台：管理端 + 资源服务 + 公共库）→ 现在的关注点：Web 3D
              与创意编程，用 Three.js 和 GLSL 把数学变成可感知的体验。
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium tracking-tight text-ink mb-3">
              这个网站
            </h2>
            <p>
              本站本身就是一个项目：pnpm Monorepo + Next.js 15 App Router（SSR）+
              Three.js 四个自研 WebGL 场景 + 设备三级降级 + 全流程 TDD。源码{' '}
              <a
                href={`${PROFILE.github}/portfolio`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-ink-muted hover:text-primary-hover underline decoration-line underline-offset-4 transition-colors"
              >
                github.com/1020847665/portfolio
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-medium tracking-tight text-ink mb-3">
              现在
            </h2>
            <p>
              已收录 {projects.length} 个真实项目（均附 GitHub 源码）。
              欢迎通过{' '}
              <a
                href={`mailto:${PROFILE.email}`}
                className="font-mono text-ink-muted hover:text-primary-hover underline decoration-line underline-offset-4 transition-colors"
              >
                {PROFILE.email}
              </a>{' '}
              交流。
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

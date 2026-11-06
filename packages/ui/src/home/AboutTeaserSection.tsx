import { Section } from '../layout/Section';
import { PROFILE } from '@portfolio/shared';

/** 关于屏段：基于 GitHub 公开资料的真实介绍 */
export function AboutTeaserSection() {
  return (
    <Section id="about-teaser" className="min-h-0 py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-ink-tertiary tracking-wider mb-3">关于</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-6">
          关于我
        </h2>
        <p className="text-ink-subtle leading-relaxed">
          我是{PROFILE.name}，{PROFILE.bio}
          从 2017 年写 Sublime 插件、2018 年在简书输出前端教程，到 jQuery
          万行源码逐行解读、企业级 .NET 平台的全栈开发，再到今天用 Three.js
          和着色器构建沉浸式 Web 体验 —— 这里记录我的项目、实验与思考。
        </p>
      </div>
    </Section>
  );
}

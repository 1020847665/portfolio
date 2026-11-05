import { Section } from '../layout/Section';

/** 关于屏段：个人介绍占位，后续接真实内容 */
export function AboutTeaserSection() {
  return (
    <Section id="about-teaser" className="min-h-0 py-24">
      <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">关于我</h2>
        <p className="text-slate-400 leading-relaxed">
          开发者，关注 Web 3D 与创意编程。这里记录我的项目、实验与思考。
        </p>
      </div>
    </Section>
  );
}

import { Section } from '../layout/Section';
import { CategoryCard } from '../projects/CategoryCard';
import { CATEGORIES, getProjectsByCategory } from '@portfolio/shared';

/** 创作方向屏段：eyebrow 小标 + 负字距标题（Linear 排版声部） */
export function CategoriesSection() {
  return (
    <Section id="categories" className="min-h-0 py-24">
      <div className="w-full max-w-6xl">
        <p className="text-sm font-medium text-ink-tertiary tracking-wider mb-3">方向</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-10">
          创作方向
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              projectCount={getProjectsByCategory(c.id).length}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

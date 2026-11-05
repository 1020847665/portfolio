import { Section } from '../layout/Section';
import { CategoryCard } from '../projects/CategoryCard';
import { CATEGORIES, getProjectsByCategory } from '../../data/projects';

/** 首屏段：四大创作方向，网格布局自动降级单列 */
export function CategoriesSection() {
  return (
    <Section id="categories" className="min-h-0 py-24">
      <div className="w-full max-w-6xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">创作方向</h2>
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

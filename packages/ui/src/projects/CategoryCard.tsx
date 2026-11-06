import NextLink from 'next/link';
import type { Category } from '@portfolio/shared';

interface CategoryCardProps {
  category: Category;
  projectCount: number;
}

/** 分类入口卡（Linear surface-1 卡）：左侧发丝竖线着色替代圆点，克制用色 */
export function CategoryCard({ category, projectCount }: CategoryCardProps) {
  return (
    <NextLink
      href={category.route}
      data-testid={`category-card-${category.id}`}
      className="group block bg-surface-1 border border-line rounded-xl p-6 hover:bg-surface-2 hover:border-line-strong transition-colors"
    >
      <span
        className="inline-block w-px h-4 mb-4"
        style={{ backgroundColor: category.accent }}
        aria-hidden
      />
      <h3 className="font-display text-xl font-medium tracking-tight text-ink">
        {category.title}
      </h3>
      <p className="mt-1 text-sm text-ink-subtle">{category.subtitle}</p>
      <p className="mt-5 text-xs font-mono text-ink-tertiary group-hover:text-ink-subtle transition-colors">
        {projectCount} 个项目 →
      </p>
    </NextLink>
  );
}

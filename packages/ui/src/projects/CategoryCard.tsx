import NextLink from 'next/link';
import type { Category } from '@portfolio/shared';

interface CategoryCardProps {
  category: Category;
  projectCount: number;
}

/** 分类入口卡：首页「创作方向」与总览页复用 */
export function CategoryCard({ category, projectCount }: CategoryCardProps) {
  return (
    <NextLink
      href={category.route}
      data-testid={`category-card-${category.id}`}
      className="group block border border-line rounded-lg p-6 bg-panel/60 hover:bg-panel transition-colors"
      style={{ borderTopColor: category.accent }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full mb-3"
        style={{ backgroundColor: category.accent }}
      />
      <h3 className="font-display text-xl font-medium">{category.title}</h3>
      <p className="mt-1 text-sm text-slate-400">{category.subtitle}</p>
      <p className="mt-4 text-xs font-mono text-slate-500">
        {projectCount} 个项目 →
      </p>
    </NextLink>
  );
}

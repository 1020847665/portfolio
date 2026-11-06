import { notFound } from 'next/navigation';
import { Navbar, Footer, ProjectCard } from '@portfolio/ui';
import { CATEGORIES, getProjectsByCategory, type CategoryId } from '@portfolio/shared';
import { CategorySceneBanner } from '../../../src/components/CategorySceneBanner';

const VALID: CategoryId[] = ['web', '3d', 'lab', 'art'];

/** 分类 id → 场景语义 */
const SCENE_BY_CATEGORY = {
  web: 'galaxy',
  '3d': 'nebula',
  lab: 'attractor',
  art: 'stylized',
} as const;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID.includes(category as CategoryId)) notFound();

  const meta = CATEGORIES.find((c) => c.id === category)!;
  const list = getProjectsByCategory(meta.id);

  return (
    <>
      <Navbar />
      <main data-testid="page-category" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <CategorySceneBanner kind={SCENE_BY_CATEGORY[meta.id]} />
        <p className="font-mono text-xs text-ink-tertiary mb-3">{meta.subtitle}</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-12">
          {meta.title}
        </h1>
        {list.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {list.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-ink-subtle">
            这个方向的作品还在酝酿中 —— 敬请期待。
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}

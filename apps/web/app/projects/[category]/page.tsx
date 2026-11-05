import { notFound } from 'next/navigation';
import { Navbar, Footer, ProjectCard } from '@portfolio/ui';
import { CATEGORIES, getProjectsByCategory, type CategoryId } from '@portfolio/shared';

const VALID: CategoryId[] = ['web', '3d', 'lab', 'art'];

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
        <h1 className="font-display text-4xl font-bold mb-2">{meta.title}</h1>
        <p className="text-slate-400 mb-10">{meta.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

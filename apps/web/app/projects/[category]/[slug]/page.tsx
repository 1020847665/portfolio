import { notFound } from 'next/navigation';
import { Navbar, Footer } from '@portfolio/ui';
import { projects, CATEGORIES } from '@portfolio/shared';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const category = CATEGORIES.find((c) => c.id === project.category)!;

  return (
    <>
      <Navbar />
      <main data-testid="page-detail" className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
        <p className="font-mono text-sm mb-2" style={{ color: category.accent }}>
          {category.title}
        </p>
        <h1 className="font-display text-4xl font-bold mb-6">{project.title}</h1>
        <p className="text-slate-400 leading-relaxed mb-8">{project.summary}</p>
        <ul className="flex flex-wrap gap-2 mb-12">
          {project.stack.map((s) => (
            <li key={s} className="px-2 py-0.5 text-xs font-mono rounded bg-panel border border-line text-slate-300">
              {s}
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-8 text-sm text-slate-500">
          详细实现过程将在真实项目内容替换时补充。
        </div>
      </main>
      <Footer />
    </>
  );
}

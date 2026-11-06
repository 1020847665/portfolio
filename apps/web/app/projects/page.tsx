import { Navbar, Footer } from '@portfolio/ui';
import { CATEGORIES, projects } from '@portfolio/shared';
import { ProjectCard, CategoryCard } from '@portfolio/ui';

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main data-testid="page-projects" className="px-6 md:px-12 py-24 max-w-6xl mx-auto">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-12">
          全部项目
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.id}
              category={c}
              projectCount={projects.filter((p) => p.category === c.id).length}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

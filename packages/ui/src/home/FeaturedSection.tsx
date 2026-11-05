import { Section } from '../layout/Section';
import { ProjectCard } from '../projects/ProjectCard';
import { projects } from '@portfolio/shared';

/** 精选作品屏段：取前 4 个项目展示 */
export function FeaturedSection() {
  const featured = projects.slice(0, 4);
  return (
    <Section id="featured" className="min-h-0 py-24">
      <div className="w-full max-w-6xl">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">精选作品</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </Section>
  );
}

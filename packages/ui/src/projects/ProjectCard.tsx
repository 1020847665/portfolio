import NextLink from 'next/link';
import type { Project } from '@portfolio/shared';

interface ProjectCardProps {
  project: Project;
}

/** 项目卡片：统一的项目展示单元，总览页/分类页/首页精选复用 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      data-testid={`project-card-${project.slug}`}
      className="group flex flex-col border border-line rounded-lg p-5 bg-panel/60 hover:bg-panel transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-medium group-hover:text-white">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-slate-500">{project.year}</span>
      </div>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{project.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="px-2 py-0.5 text-xs font-mono rounded bg-void border border-line text-slate-300">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 border-t border-line/60 flex gap-4 text-xs font-mono">
        <NextLink
          href={`/projects/${project.category}/${project.slug}`}
          className="text-slate-400 hover:text-white transition-colors"
        >
          详情 →
        </NextLink>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </article>
  );
}

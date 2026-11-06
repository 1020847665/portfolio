import NextLink from 'next/link';
import type { Project } from '@portfolio/shared';

interface ProjectCardProps {
  project: Project;
}

/**
 * 项目卡片（Linear feature-card 规格）：
 * surface-1 底 + 1px hairline + 12px 圆角 + 24px 内距；悬浮升至 surface-2
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      data-testid={`project-card-${project.slug}`}
      className="group flex flex-col bg-surface-1 border border-line rounded-xl p-6 hover:bg-surface-2 hover:border-line-strong transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-lg font-medium tracking-tight text-ink">
          {project.title}
        </h3>
        <span className="shrink-0 font-mono text-xs text-ink-tertiary">{project.year}</span>
      </div>
      <p className="mt-2 text-sm text-ink-subtle leading-relaxed">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li
            key={s}
            className="px-2 py-0.5 text-xs font-mono rounded-md bg-canvas border border-line text-ink-muted"
          >
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t border-line flex gap-4 text-xs font-mono">
        <NextLink
          href={`/projects/${project.category}/${project.slug}`}
          className="text-ink-subtle hover:text-primary-hover transition-colors"
        >
          详情 →
        </NextLink>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-subtle hover:text-primary-hover transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </article>
  );
}

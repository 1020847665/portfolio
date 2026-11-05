import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

/** 项目卡片：统一的项目展示单元，总览页/分类页/首页精选复用 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      data-testid={`project-card-${project.slug}`}
      className="group border border-line rounded-lg p-5 bg-panel/60 hover:bg-panel transition-colors"
    >
      {project.demo && (
        <span className="inline-block mb-2 px-2 py-0.5 text-xs font-mono rounded bg-panel border border-line text-slate-400">
          演示占位
        </span>
      )}
      <h3 className="font-display text-lg font-medium group-hover:text-white">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{project.summary}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="px-2 py-0.5 text-xs font-mono rounded bg-void border border-line text-slate-300">
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}

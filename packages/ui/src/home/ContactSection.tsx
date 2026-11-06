import { Section } from '../layout/Section';
import { PROFILE } from '@portfolio/shared';

/** 联系屏段：真实邮箱与 GitHub 入口 */
export function ContactSection() {
  return (
    <Section id="contact" className="min-h-0 py-24">
      <div className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">联系我</h2>
        <p className="text-slate-400 mb-8">有想法？欢迎交流。</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-block px-6 py-3 border border-line rounded-lg hover:border-slate-400 transition-colors font-mono text-sm"
          >
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-line rounded-lg hover:border-slate-400 transition-colors font-mono text-sm"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

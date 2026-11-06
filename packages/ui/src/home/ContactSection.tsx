import { Section } from '../layout/Section';
import { PROFILE } from '@portfolio/shared';

/**
 * 联系屏段：收束 CTA 面板（Linear cta-banner 规格）
 * surface-1 底 + hairline + 12px 圆角 + 48px 内距；主按钮唯一薰衣草蓝
 */
export function ContactSection() {
  return (
    <Section id="contact" className="min-h-0 py-24">
      <div className="w-full max-w-3xl bg-surface-1 border border-line rounded-2xl px-8 py-14 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          有想法？欢迎交流
        </h2>
        <p className="text-ink-subtle mb-8">项目合作、技术讨论，或只是打个招呼。</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            发邮件
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded-lg bg-surface-2 border border-line-strong text-ink text-sm font-medium hover:bg-surface-3 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

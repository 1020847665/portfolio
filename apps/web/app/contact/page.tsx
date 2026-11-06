import { Navbar, Footer } from '@portfolio/ui';
import { PROFILE } from '@portfolio/shared';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        data-testid="page-contact"
        className="px-6 md:px-12 py-24 max-w-3xl mx-auto text-center"
      >
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-4">联系我</h1>
        <p className="text-ink-subtle mb-12">有想法？欢迎交流。</p>
        <div className="bg-surface-1 border border-line rounded-2xl px-8 py-12 flex flex-col items-center gap-6">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-ink hover:text-primary-hover transition-colors text-lg"
          >
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-ink-subtle hover:text-ink transition-colors"
          >
            github.com/{PROFILE.login} ↗
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

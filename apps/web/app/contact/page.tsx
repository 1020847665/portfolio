import { Navbar, Footer } from '@portfolio/ui';
import { PROFILE } from '@portfolio/shared';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main data-testid="page-contact" className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl font-bold mb-6">联系我</h1>
        <p className="text-slate-400 mb-10">有想法？欢迎交流。</p>
        <div className="flex flex-col items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-slate-300 hover:text-white transition-colors text-lg"
          >
            {PROFILE.email}
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-slate-300 hover:text-white transition-colors"
          >
            github.com/{PROFILE.login} ↗
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { PROFILE } from '@portfolio/shared';

/** 页脚（Linear footer 规格）：canvas 底，ink-subtle，caption 字号 */
export function Footer() {
  return (
    <footer className="border-t border-line py-12 text-center text-sm text-ink-subtle">
      <p>
        © 2026{' '}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-ink-muted transition-colors"
        >
          {PROFILE.name}
        </a>{' '}
        · Built with React + Three.js
      </p>
    </footer>
  );
}

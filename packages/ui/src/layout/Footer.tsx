import { PROFILE } from '@portfolio/shared';

/** 页脚：版权 + 极简社交入口 */
export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-sm text-slate-500">
      <p>
        © 2026{' '}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-300 transition-colors"
        >
          {PROFILE.name}
        </a>{' '}
        · Built with React + Three.js
      </p>
    </footer>
  );
}

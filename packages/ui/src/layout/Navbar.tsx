import NextLink from 'next/link';
import { CATEGORIES } from '@portfolio/shared';

/**
 * 顶部导航（Linear top-nav 规格）：
 * canvas 底 + 发丝线下缘，56px 高，body-sm 字号
 */
export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-canvas/70 border-b border-line">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        <NextLink
          href="/"
          className="font-display font-semibold text-lg tracking-tight text-ink hover:opacity-90 transition-opacity"
        >
          Portfolio
        </NextLink>
        <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <NextLink
                href={c.route}
                className="whitespace-nowrap px-2 md:px-3 py-1.5 text-sm text-ink-subtle hover:text-ink transition-colors"
              >
                {c.title}
              </NextLink>
            </li>
          ))}
          <li>
            <NextLink
              href="/contact"
              className="whitespace-nowrap px-3 py-1.5 text-sm text-ink-subtle hover:text-ink transition-colors"
            >
              联系
            </NextLink>
          </li>
          <li className="ml-1 md:ml-2">
            <a
              href="https://github.com/1020847665"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block whitespace-nowrap px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

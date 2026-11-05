import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/projects';

/** 顶部导航：logo + 分类入口，移动端横向可滚动 */
export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-void/70 border-b border-line">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4 md:px-6">
        <Link to="/" className="font-display font-bold text-lg tracking-tight">
          Portfolio
        </Link>
        <ul className="flex items-center gap-1 md:gap-4 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link
                to={c.route}
                className="whitespace-nowrap px-2 md:px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                {c.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/contact"
              className="whitespace-nowrap px-2 md:px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              联系
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

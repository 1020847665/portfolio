import Link from 'next/link';

export default function NotFound() {
  return (
    <main data-testid="page-404" className="min-h-screen flex flex-col items-center justify-center">
      <p className="font-display text-6xl font-bold mb-4">404</p>
      <p className="text-slate-400 mb-8">页面不存在</p>
      <Link href="/" className="text-neon-cyan hover:underline">
        返回首页 →
      </Link>
    </main>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      data-testid="page-404"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <p className="font-display text-6xl font-semibold tracking-tight mb-4">404</p>
      <p className="text-ink-subtle mb-8">页面不存在</p>
      <Link href="/" className="text-primary-hover hover:underline underline-offset-4">
        返回首页 →
      </Link>
    </main>
  );
}

import { Navbar, Footer } from '@portfolio/ui';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main data-testid="page-about" className="px-6 md:px-12 py-24 max-w-4xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-6">关于我</h1>
        <p className="text-slate-400 leading-relaxed">
          开发者，关注 Web 3D 与创意编程。这里记录我的项目、实验与思考。
        </p>
      </main>
      <Footer />
    </>
  );
}

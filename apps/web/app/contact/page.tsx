import { Navbar, Footer } from '@portfolio/ui';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main data-testid="page-contact" className="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl font-bold mb-6">联系我</h1>
        <p className="text-slate-400 mb-8">有想法？欢迎交流。</p>
        <p className="font-mono text-slate-300">hello@example.com</p>
      </main>
      <Footer />
    </>
  );
}

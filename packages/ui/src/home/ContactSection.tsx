import { Link } from 'react-router-dom';
import { Section } from '../layout/Section';

/** 联系屏段：邮箱与社交入口占位 */
export function ContactSection() {
  return (
    <Section id="contact" className="min-h-0 py-24">
      <div className="text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">联系我</h2>
        <p className="text-slate-400 mb-8">有想法？欢迎交流。</p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 border border-line rounded-lg hover:border-slate-400 transition-colors"
        >
          查看联系方式 →
        </Link>
      </div>
    </Section>
  );
}

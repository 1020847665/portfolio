import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

/** 全屏段落容器：所有首页屏段的统一骨架 */
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center justify-center px-6 md:px-12 ${className}`}
    >
      {children}
    </section>
  );
}

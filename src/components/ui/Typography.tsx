'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface TypographyProps {
  children: ReactNode;
  variant?: 'hero' | 'section' | 'display' | 'body' | 'caption';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Typography({
  children,
  variant = 'body',
  className,
  as
}: TypographyProps) {
  const variants = {
    hero: 'text-hero',
    section: 'text-section',
    display: 'text-display',
    body: 'text-base md:text-lg',
    caption: 'text-sm text-white/60'
  };

  const Component = as || 'p';

  return (
    <Component className={clsx(variants[variant], className)}>
      {children}
    </Component>
  );
}

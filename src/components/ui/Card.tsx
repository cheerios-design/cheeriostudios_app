'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
}

export default function Card({ children, className, glass = false }: CardProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl p-8',
        glass ? 'glass' : 'bg-dark-surface',
        className
      )}
    >
      {children}
    </div>
  );
}

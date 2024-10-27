import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body' | 'caption' | 'overline';

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-bold',
  h4: 'text-xl font-bold',
  h5: 'text-lg font-bold',
  h6: 'text-base font-bold',
  subtitle1: 'text-lg font-medium',
  subtitle2: 'text-base font-medium',
  body: 'text-base',
  caption: 'text-sm',
  overline: 'text-xs uppercase tracking-wider',
};

export default function Typography({ variant, children, className = '' }: TypographyProps)  {
  const Element = variant.startsWith('h') ? variant : 'p';
  const classes = `${variantClasses[variant]} ${className}`;

  return React.createElement(Element, { className: classes }, children);
};

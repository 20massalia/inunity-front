import React from 'react';

type TypographySize = 'Small' | 'Normal' | 'Large' | 'XLarge';
type TypographyType = 'Heading' | 'Paragraph' | 'Label';
type TypographyWeight = 'Light' | 'Regular' | 'Bold';

type TypographyVariant = `${TypographyType}${TypographySize}${TypographyWeight}`;

interface TypographyProps {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<TypographyVariant, string> = {
  HeadingSmallLight: 'text-h-sm font-light',
  HeadingSmallRegular: 'text-h-sm font-normal',
  HeadingSmallBold: 'text-h-sm font-bold',
  HeadingNormalLight: 'text-h-no font-light',
  HeadingNormalRegular: 'text-h-no font-normal',
  HeadingNormalBold: 'text-h-no font-bold',
  HeadingLargeLight: 'text-h-lg font-light',
  HeadingLargeRegular: 'text-h-lg font-normal',
  HeadingLargeBold: 'text-h-lg font-bold',
  HeadingXLargeLight: 'text-h-xl font-light',
  HeadingXLargeRegular: 'text-h-xl font-normal',
  HeadingXLargeBold: 'text-h-xl font-bold',
  ParagraphSmallLight: 'text-p-sm font-light',
  ParagraphSmallRegular: 'text-p-sm font-normal',
  ParagraphSmallBold: 'text-p-sm font-bold',
  ParagraphNormalLight: 'text-p-no font-light',
  ParagraphNormalRegular: 'text-p-no font-normal',
  ParagraphNormalBold: 'text-p-no font-bold',
  ParagraphLargeLight: 'text-p-lg font-light',
  ParagraphLargeRegular: 'text-p-lg font-normal',
  ParagraphLargeBold: 'text-p-lg font-bold',
  ParagraphXLargeLight: 'text-p-xl font-light',
  ParagraphXLargeRegular: 'text-p-xl font-normal',
  ParagraphXLargeBold: 'text-p-xl font-bold',
  LabelSmallLight: 'text-l-sm font-light text-black-50',
  LabelSmallRegular: 'text-l-sm font-normal text-black-50',
  LabelSmallBold: 'text-l-sm font-bold text-black-50',
  LabelNormalLight: 'text-l-no font-light text-black-50',
  LabelNormalRegular: 'text-l-no font-normal text-black-50',
  LabelNormalBold: 'text-l-no font-bold text-black-50',
  LabelLargeLight: 'text-l-lg font-light text-black-50',
  LabelLargeRegular: 'text-l-lg font-normal text-black-50',
  LabelLargeBold: 'text-l-lg font-bold text-black-50',
  LabelXLargeLight: 'text-l-xl font-light text-black-50',
  LabelXLargeRegular: 'text-l-xl font-normal text-black-50',
  LabelXLargeBold: 'text-l-xl font-bold text-black-50',

};

export const Typography = React.forwardRef<HTMLElement, TypographyProps>((props, ref) => {
  const { variant = 'ParagraphNormalRegular', children, className = '' } = props;
  const Element = variant.startsWith('Heading') ? 'h2' : 'p';
  const classes = `${variantClasses[variant]} ${className}`;

  return React.createElement(Element, { ref: ref, className: classes }, children);
});

Typography.displayName = 'Typography';
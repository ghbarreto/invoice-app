import React from 'react';

import { twMerge } from 'tailwind-merge';

type TText = {
  t:
    | 'heading-large'
    | 'heading-medium'
    | 'heading-small'
    | 'heading-small-variant'
    | 'body'
    | 'body-variant'
    | 'heading-medium-variant';
  id?: string;
  tag?: 'h1' | 'p' | 'h2' | 'div';
  children: React.ReactNode;
  customClasses?: string;
  color?: number;
};

export const Text = ({ t, children, customClasses, color, ...props }: TText) => {
  const Tag = props.tag || 'p';

  const textProps = {
    'heading-large': 'text-4xl font-bold tracking-tighter leading-8',
    'heading-medium': 'text-2xl font-bold tracking-tighter leading-6',
    'heading-medium-variant': 'text-base font-bold tracking-tighter leading-6',
    'heading-small': 'text-sm font-bold tracking-tight leading-6',
    'heading-small-variant': 'text-xl font-bold tracking-tight leading-4',
    body: 'font-medium text-sm tracking-tigther leading-5',
    'body-variant': 'font-medium text-sm  leading-4 tracking-tight',
  }[t];

  const c = {
    1: 'text-primary',
    2: 'text-primary-hover',
    3: 'text-dark_primary',
    4: 'text-dark_primary_hover',
    5: 'text-secondary_light',
    6: 'text-secondary_dark',
    7: 'text-secondary_light_hover',
    8: 'text-secondary_black',
    9: 'text-danger',
    10: 'text-danger_hover',
    11: 'text-background_light',
    12: 'text-background_dark',
  }[color || 0];

  return (
    <Tag
      className={twMerge(
        `${textProps}   font-sans  text-secondary_black dark:text-secondary_light
				${color != 0 ? c : ''}
				${customClasses} `
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

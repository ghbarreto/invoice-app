import React from 'react';

import { twMerge } from 'tailwind-merge';

type TText = {
  t: 'title' | 'body' | 'body-small';
  id?: string;
  tag?: 'h1' | 'p' | 'h2' | 'div' | 'label';
  children: React.ReactNode;
  customClasses?: string;
  color?: number;
  onClick?: () => void;
};

export const Text = ({ t, children, customClasses, color, onClick, ...props }: TText) => {
  const Tag = props.tag || 'div';

  const textProps = {
    title: 'text-[1.5rem] font-bold tracking-wide leading-7 md:text-[2.25rem]', //24px, 36px
    body: 'font-medium text-[.93rem] tracking-tigther leading-5', //15px sm
    'body-small': 'font-medium text-[.81rem] tracking-tigther leading-5', //13px sm
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
      onClick={onClick}
      className={twMerge(
        `font-sans text-secondary_black  dark:text-secondary_light
				${color != 0 ? c : ''}
        ${textProps} 
				${customClasses} `
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

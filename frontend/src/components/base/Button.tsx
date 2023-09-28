import React from 'react';

import { Text } from '..';
import { twMerge } from 'tailwind-merge';

type TButton = {
  hasPlusSign?: boolean;
  type: 'primary' | 'secondary' | 'delete' | 'third' | 'fourth';
  txt: string;
  isDisabled?: boolean;
  customClasses?: string;
  textClasses?: string;
  onClick?: () => void;
};

export const Button = ({ type, hasPlusSign, txt, ...props }: TButton) => {
  const buttonProps = {
    primary: `bg-primary hover:bg-primary_hover`,
    secondary: `bg-btn_bg hover:bg-secondary_black hover:dark:bg-dark_primary`,
    delete: `bg-danger hover:bg-danger_hover `,
    third: `bg-background_light hover:bg-secondary_light dark:bg-dark_primary_hover dark:hover:bg-dark_primary`,
    fourth: `bg-background_light w-10/12 justify-center dark:bg-dark_primary max-w-sm hover:bg-secondary_light`,
  }[type];

  const txtColor = {
    primary: `text-white`,
    secondary: `text-secondary_dark dark:text-secondary_light`,
    delete: `text-white md:p-6`,
    third: `text-secondary_light_hover`,
    fourth: `text-secondary_light_hover`,
  }[type];

  return (
    <button
      {...props}
      className={twMerge(
        `${buttonProps} w-max-content flex h-14 items-center justify-center rounded-full font-sans transition ${props.customClasses}`
      )}
      disabled={props.isDisabled}
    >
      {hasPlusSign && (
        <div className='relative ml-3 flex h-10 w-10 justify-center rounded-full bg-background_light font-sans text-4xl font-semibold'>
          <span className='relative top-1 text-3xl text-primary'>+</span>
        </div>
      )}

      <div className='ml-1 mr-1 p-2'>
        {type === 'fourth' && (
          <Text t='body' customClasses='text-secondary_light_hover font-medium'>
            +
          </Text>
        )}
        <Text
          t='body'
          customClasses={twMerge(`${txtColor} font-bold p-2 ${!hasPlusSign ? 'md:p-6' : ''} ${props.textClasses}`)}
        >
          {txt}
        </Text>
      </div>
    </button>
  );
};

import React from 'react';

import { Text } from '..';

type TButton = {
    hasPlusSign?: boolean;
    type: 'primary' | 'secondary' | 'delete' | 'third' | 'fourth';
    txt: string;
    isDisabled?: boolean;
    customClasses?: string;
};

export const Button = ({ type, hasPlusSign, txt, ...props }: TButton) => {
    const buttonProps = {
        primary: `bg-primary hover:bg-primary_hover  `,
        secondary: `bg-btn_bg hover:bg-secondary_black hover:dark:bg-dark_primary`,
        delete: `bg-danger hover:bg-danger_hover `,
        third: `bg-background_light hover:bg-secondary_light dark:bg-dark_primary dark:hover:bg-background_light`,
        fourth: `bg-background_light w-10/12 justify-center dark:bg-dark_primary max-w-sm hover:bg-secondary_light`,
    }[type];

    const txtColor = {
        primary: `text-white`,
        secondary: `text-secondary_dark dark:text-secondary_light`,
        delete: `text-white`,
        third: `text-secondary_light_hover`,
        fourth: `text-secondary_light_hover`,
    }[type];

    return (
        <button
            className={`${buttonProps} w-max-content flex h-14 items-center rounded-full font-sans transition ${props.customClasses}`}
            onClick={() => alert('hello')}
            disabled={props.isDisabled}
        >
            {hasPlusSign && (
                <div className='relative ml-3 flex h-10 w-10 justify-center rounded-full bg-background_light font-sans font-semibold text-4xl'>
                    <span className='relative top-1 text-3xl text-primary'>+</span>
                </div>
            )}

            <div className='ml-2 mr-4 inline-flex'>
                {type === 'fourth' && (
                    <Text t='heading-medium' customClasses='text-secondary_light_hover font-medium mr-2'>
                        +
                    </Text>
                )}
                <Text t='heading-small' customClasses={txtColor}>
                    {txt}
                </Text>
            </div>
        </button>
    );
};

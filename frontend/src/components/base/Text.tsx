import React from 'react';

type TText = {
    t: 'heading-large' | 'heading-medium' | 'heading-small' | 'heading-small-variant' | 'body' | 'body-variant';
    children: React.ReactNode;
    customClasses?: string;
};

export const Text = ({ t, children, customClasses, ...props }: TText) => {
    const textProps = {
        'heading-large': 'text-4xl font-bold tracking-tighter leading-8',
        'heading-medium': 'text-2xl font-bold tracking-tighter leading-6',
        'heading-small': 'text-sm font-bold tracking-tight leading-6',
        'heading-small-variant': 'text-xl font-bold tracking-tighter leading-4',
        body: 'font-medium text-sm tracking-tigther leading-5',
        'body-variant': 'font-medium text-sm  leading-4 tracking-tight',
    }[t];

    return (
        <p
            className={`${textProps} font-sans ${customClasses} text-secondary_black dark:text-secondary_light `}
            {...props}
        >
            {children}
        </p>
    );
};

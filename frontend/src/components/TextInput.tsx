import React from 'react';

import { Text } from './';

type TInput = {
    label: string;
    onChange: () => void;
    value: string;
};

export const Input = ({ label, onChange, value }: TInput) => {
    return (
        <div className="w-8/12 max-w-xs">
            <Text t="body-variant" customClasses="mb-2 ml-1 text-secondary_light_hover">
                {label}
            </Text>
            <input
                className="`bg-white rounded-md border px-4 pt-3 py-2.5 inline-flex items-center w-full justify-between 
				border-secondary_light outline-none font-bold text-secondary_black 
				dark:bg-dark_primary dark:border-dark_primary_hover dark:text-white focus:border-primary"
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

import React, { ChangeEvent } from 'react';

import { Text } from './Text';

type TInput = {
  label?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  customClasses?: string;
  labelCustomClasses?: string;
  placeholder?: string;
  name?: string;
  type?: string;
};

export const Input = ({ label, onChange, value, customClasses, labelCustomClasses, ...props }: TInput) => {
  return (
    <div>
      <Text t='body-small' customClasses={`mb-2 ml-1 text-secondary_light_hover ${labelCustomClasses}`}>
        {label}
      </Text>
      <input
        {...props}
        className={`inline-flex w-full items-center justify-between rounded-md border border-secondary_light bg-white px-4 
				py-2.5 pt-3 font-bold text-secondary_black outline-none
				focus:border-primary dark:border-dark_primary_hover dark:bg-dark_primary dark:text-white ${customClasses}`}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

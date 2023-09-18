import React, { useEffect, useRef, useState } from 'react';

import { Text } from '@/components';

type TSelectBox = {
  label?: string;

  values: Array<{
    label: string;
    value: string;
  }>;

  sel: {
    label: string;
    value: string;
  };
};

export const SelectBox = ({ label, values, sel }: TSelectBox) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const ref = useRef(null);
  const [selected, setSelected] = useState({
    label: sel.label,
    value: sel.value,
  });

  const toggle = () => setIsToggled(!isToggled);

  const onChange = (label: string, value: string) => {
    setSelected({ label, value });
    toggle();
  };

  useEffect(() => {
    console.log(ref);
  }, [ref]);

  return (
    <div className='w-8/12 max-w-xs' ref={ref}>
      <Text t='body-variant' customClasses='mb-2 ml-1 text-secondary_light_hover'>
        {label}
      </Text>
      <button
        onClick={toggle}
        className={`inline-flex w-full items-center justify-between rounded-md border bg-white px-4 py-2.5 pt-3 text-white hover:border-primary ${
          isToggled ? `border-primary ` : 'border-secondary_light'
        } dark:border-dark_primary_hover dark:bg-dark_primary`}
        type='button'
      >
        <Text t='heading-small' customClasses='dark:text-white'>
          {selected.label}
        </Text>
        <svg
          className='ml-2.5 h-3.5 w-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='rgb(124, 93, 250)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>

      {isToggled && (
        <div className='absolute z-10 mt-3 w-8/12 max-w-xs divide-y rounded-lg bg-white shadow-[5px_5px_0px_0px_rgba(109,40,217)] dark:bg-dark_primary_hover'>
          <ul className='py-2 ' aria-labelledby='dropdownDividerButton'>
            {values.map((e, i, arr) => {
              const lastIndex =
                arr.length - 1 !== i ? 'border-b border-b-secondary_light dark:border-dark_primary' : 'py-1';

              return (
                <li className='py-1' key={i + e.label} onClick={() => onChange(e.label, e.value)}>
                  <Text
                    t='heading-small'
                    customClasses={`${lastIndex} px-4 py-2 hover:text-primary dark:text-secondary_light dark:hover:text-primary`}
                  >
                    {e.label}
                  </Text>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';

import { Text } from '@/components';

type TDropdown = {
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

export const Dropdown = ({ label, values, sel }: TDropdown) => {
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
        <div className="w-8/12 max-w-xs" ref={ref}>
            <Text t="body-variant" customClasses="mb-2 ml-1 text-secondary_light_hover">
                {label}
            </Text>
            <button
                onClick={toggle}
                className={`text-white bg-white rounded-md border px-4 pt-3 py-2.5 inline-flex items-center w-full justify-between hover:border-primary
				 ${isToggled ? `border-primary ` : 'border-secondary_light'}
				dark:bg-dark_primary
				dark:border-dark_primary_hover
				 `}
                type="button"
            >
                <Text t="heading-small" customClasses="dark:text-white">
                    {selected.label}
                </Text>
                <svg
                    className="w-2.5 h-3.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="rgb(124, 93, 250)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            {isToggled && (
                <div className="absolute w-8/12 max-w-xs z-10 mt-3 divide-y bg-white dark:bg-dark_primary_hover rounded-lg shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
                    <ul className="py-2 " aria-labelledby="dropdownDividerButton">
                        {values.map((e, i, arr) => {
                            const lastIndex =
                                arr.length - 1 !== i
                                    ? 'border-b border-b-secondary_light dark:border-dark_primary'
                                    : 'py-1';

                            return (
                                <li className="py-1" key={i + e.label} onClick={() => onChange(e.label, e.value)}>
                                    <Text
                                        t="heading-small"
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

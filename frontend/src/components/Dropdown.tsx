import React, { useState } from 'react';

type TDropdown = {
    label: string;

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

    const [selected, setSelected] = useState({
        label: sel.label,
        value: sel.value,
    });

    const toggle = () => setIsToggled(!isToggled);

    const onChange = (label: string, value: string) => {
        setSelected({ label, value });
        toggle();
    };

    return (
        <div className="ml-10 w-4/12">
            <button
                onClick={toggle}
                className={`text-white bg-white bg-background_light text-sm font-medium rounded-md border
				${isToggled ? `border-primary` : 'border-secondary_light'}
				hover:border-primary
				 px-4 pt-3 py-2.5 inline-flex items-center w-full justify-between
				 font-semibold
				 `}
                type="button"
            >
                {selected.label}
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
                <div className="z-10 mt-3 w-full bg-white divide-y bg-background_light rounded-lg shadow-[5px_5px_0px_0px_rgba(109,40,217)]">
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDividerButton"
                    >
                        {values.map((e, i, arr) => {
                            const lastIndex = arr.length - 1 !== i ? 'border-b border-b-secondary_light' : '';

                            return (
                                <li key={i + e.label}>
                                    <a
                                        href="#"
                                        onClick={() => onChange(e.label, e.value)}
                                        className={`${lastIndex} block px-4 py-2 text-sm hover:text-primary font-semibold hover:bg-gray-100 `}
                                    >
                                        {e.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

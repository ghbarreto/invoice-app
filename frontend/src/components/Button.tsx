import React from 'react';

type TButton = {
    hasPlusSign?: boolean;
    type: 'primary' | 'secondary' | 'delete' | 'third' | 'fourth';
    txt: string;
    isDisabled?: boolean;
};

export const Button = ({ type, hasPlusSign, txt, ...props }: TButton) => {
    const buttonProps = {
        primary: `bg-primary hover:bg-primary_hover text-background_light text-lg`,
        secondary: `bg-dark_primary text-secondary_dark text-lg
			dark:secondary_light dark:text-secondary_light hover:bg-secondary-black hover:dark:bg-background_dark`,
        delete: `bg-danger hover:bg-danger_hover text-background_light text-lg`,
        third: `bg-background_light text-secondary_dark hover:bg-secondary_light text-lg
				dark:text-secondary_light dark:bg-dark_primary dark:hover:bg-background_light`,
        fourth: `bg-background_light text-secondary_dark w-6/12 flex justify-center font-medium text-lg font-semibold
				hover:bg-secondary_light 
		`,
    }[type];

    return (
        <button
            className={`${buttonProps} w-max-content h-12 rounded-full flex items-center transition`}
            onClick={() => alert('hello')}
            disabled={props.isDisabled}
        >
            {hasPlusSign && (
                <div className="bg-background_light text-4xl rounded-full h-8 w-8 flex justify-center ml-3 relative font-sans">
                    <span className="relative top-0 text-primary text-3xl">+</span>
                </div>
            )}

            <span className="ml-6 mr-6  font-sans">
                {type === 'fourth' && <span className="mr-3">+</span>}
                {txt}
            </span>
        </button>
    );
};

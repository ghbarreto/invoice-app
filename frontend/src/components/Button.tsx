import React from 'react';

export const Button = ({ type }: { type?: string }) => {
    let buttonType = '';

    switch (type) {
        case 'primary':
            buttonType =
                'bg-primary w-max-content h-14 text-4xl rounded-full flex items-center justify-between hover:bg-primary_hover transition';
    }

    return (
        <button className={buttonType} onClick={() => alert('hello')}>
            <div className="bg-background_light rounded-full h-10 w-10 flex justify-center ml-3 relative ">
                <span className="relative top-1 text-primary">+</span>
            </div>
            <span className="ml-4 mr-5 text-background_light font-medium text-lg font-sans">New Invoice</span>
        </button>
    );
};

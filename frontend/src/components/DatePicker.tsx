import React, { useState } from 'react';
import D from 'react-datepicker';
import Image from 'next/image';

import Calendar from '/public/calendar.svg';
import { Text } from './';

export const DatePicker = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    return (
        <div className="w-8/12 max-w-xs">
            <Text t="body-variant" customClasses="mb-2 ml-1 text-secondary_light_hover">
                Test
            </Text>
            <D
                selected={startDate}
                showFourColumnMonthYearPicker={false}
                showPopperArrow={false}
                dateFormatCalendar="MMM yyyy"
                dateFormat="dd MMM yyyy"
                showIcon
                customInput={React.createElement(React.forwardRef(CustomInput))}
                onChange={d => setStartDate(d)}
            />
        </div>
    );
};

export const CustomInput = ({ value, onClick }: { value: string; onClick: () => void }) => {
    return (
        <div className="relative">
            <input
                className={`bg-white rounded-md border w-full
					border-secondary_light font-bold text-secondary_black
					border-btn-bg active:border-primary outline-none
					dark:bg-dark_primary dark:border-dark_primary_hover dark:text-white focus:border-primary
			`}
                value={value}
                onClick={onClick}
            />
            <span className="float-right absolute top-3 right-4" onClick={onClick}>
                <Image src={Calendar} alt="calendar" width={20} height={20} />
            </span>
        </div>
    );
};

import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import Image from 'next/image';

import Calendar from '/public/calendar.svg';
import { Text } from './Text';

export const DatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div>
      <Text t='body-small' customClasses='mb-2 ml-1 text-secondary_light_hover'>
        Test
      </Text>
      <ReactDatePicker
        selected={startDate}
        showFourColumnMonthYearPicker={false}
        showPopperArrow={false}
        dateFormatCalendar='MMM yyyy'
        dateFormat='dd MMM yyyy'
        showIcon
        customInput={React.createElement(React.forwardRef(CustomInput))}
        onChange={(d) => setStartDate(d)}
      />
    </div>
  );
};

export const CustomInput = ({ value, onClick }: { value: string; onClick: () => void }) => {
  return (
    <div className='relative'>
      <input
        className={`border-btn-bg w-full rounded-md border
					border-secondary_light bg-white font-bold
					text-secondary_black outline-none focus:border-primary
					active:border-primary dark:border-dark_primary_hover dark:bg-dark_primary dark:text-white
			`}
        value={value}
        onClick={onClick}
      />
      <span className='absolute right-4 top-3 float-right' onClick={onClick}>
        <Image src={Calendar} alt='calendar' width={20} height={20} />
      </span>
    </div>
  );
};

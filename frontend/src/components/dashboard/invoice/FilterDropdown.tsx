import React, { useState } from 'react';

import { useInvoices } from '@/stores/invoices/store';
import { InvoiceStatusTypes } from '@/types/invoice_types';
import { Text } from '@/components';

export const FilterDropdown = () => {
  const [checkbox, setCheckbox] = useState({
    draft: true,
    pending: true,
    paid: true,
    overdue: true,
  });
  const { invoicesStatus } = useInvoices();
  const options = ['paid', 'pending', 'overdue', 'draft'];

  return (
    <div className={`relative left-10  block`}>
      <div
        id='dropdownDefaultCheckbox'
        className='absolute right-6 top-3 z-10 w-48 divide-y  rounded-lg bg-white shadow-normal dark:bg-dark_primary'
      >
        <ul className='space-y-3 p-3' aria-labelledby='dropdownCheckboxButton'>
          {options.map((e) => {
            return (
              <li
                key={e}
                className='p-1 hover:cursor-pointer'
                onClick={() => setCheckbox((prev) => ({ ...prev, [e]: !checkbox[e as InvoiceStatusTypes] }))}
              >
                <div className='flex items-baseline justify-between'>
                  <div>
                    <input
                      checked={checkbox[e as keyof typeof checkbox]}
                      name={e}
                      onChange={(e) => {
                        setCheckbox((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
                      }}
                      id='checkbox-item-2'
                      type='checkbox'
                      className='h-4 w-4 rounded bg-primary text-primary accent-primary ring-offset-primary focus:ring-1 focus:ring-primary dark:focus:ring-primary dark:focus:ring-offset-primary'
                    />
                    <Text tag='label' t='body' customClasses='capitalize ml-3 font-bold hover:cursor-pointer'>
                      {e}
                    </Text>
                  </div>
                  <Text t='body' customClasses='mr-3 font-bold'>
                    {invoicesStatus[e as InvoiceStatusTypes]}
                  </Text>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

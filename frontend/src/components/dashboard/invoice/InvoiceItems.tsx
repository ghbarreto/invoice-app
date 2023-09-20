import React from 'react';

import { Container, Currency, Text } from '@/components';
import { useInvoices } from '@/pages/dashboard/store';
import { InvoiceItems as Item } from '@/types/invoice_types';

export const InvoiceItems = () => {
  const { selectedInvoice } = useInvoices();

  return (
    <Container customClasses='bg-[#F9FAFE] dark:dark_primary_hover -mb-6'>
      {selectedInvoice.items.map((e: Item, index: number) => {
        return (
          <div key={e.invoice_id + index} className='p-5 -ml-4 flex justify-between items-end'>
            <div className='-mb-3'>
              <Text t='heading-medium-variant'>{e.item_name}</Text>

              <Text tag='div' t='heading-medium-variant' customClasses='text-secondary_light_hover font-sans'>
                <span className='flex items-baseline'>
                  {e.item_amount} x
                  <span className='ml-3'>
                    <Currency
                      amount={e.price}
                      currencyCode={selectedInvoice.currency_code}
                      customClasses='text-base text-secondary_light_hover font-bold font-sans'
                    />
                  </span>
                </span>
              </Text>
            </div>

            <Currency
              amount={e.total}
              currencyCode={selectedInvoice.currency_code}
              customClasses='font-sans font-semibold text-md'
            />
          </div>
        );
      })}
    </Container>
  );
};

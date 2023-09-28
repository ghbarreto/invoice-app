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
          <>
            <div key={e.invoice_id + index} className='-ml-4 flex items-end justify-between p-5 md:hidden'>
              <div className='-mb-3'>
                <Text t='body'>{e.item_name}</Text>

                <Text tag='div' t='body' customClasses='text-secondary_light_hover font-sans'>
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

                  {e.overcharge > 0 ? (
                    <Text t='body' customClasses='text-xs block items-center'>
                      Additional Charge:{' '}
                      <Currency
                        amount={e.overcharge}
                        currencyCode={selectedInvoice.currency_code}
                        customClasses='font-sans text-xs font-semibold'
                      />
                    </Text>
                  ) : null}
                </Text>
              </div>

              <div className='text-end md:hidden'>
                <Currency
                  amount={e.total}
                  currencyCode={selectedInvoice.currency_code}
                  customClasses='font-sans font-semibold text-md'
                />
              </div>
            </div>
          </>
        );
      })}

      {/* desktop */}
      <div className='hidden overflow-x-auto md:relative md:block'>
        <table className=' w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead>
            <tr>
              <th scope='col' className='px-6 py-3'>
                <Text t='body' customClasses='dark:text-secondary_light'>
                  Item Name
                </Text>
              </th>
              <th scope='col' className='px-6 py-3'>
                <Text t='body' customClasses='dark:text-secondary_light text-right'>
                  QTY.
                </Text>
              </th>
              <th scope='col' className='px-6 py-3'>
                <Text t='body' customClasses='dark:text-secondary_light text-right'>
                  Price
                </Text>
              </th>
              <th scope='col' className='px-6 py-3'>
                <Text t='body' customClasses='dark:text-secondary_light text-right'>
                  Total
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedInvoice.items.map((e: Item) => {
              return (
                <>
                  <tr>
                    <th scope='row' className=' whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      <Text t='body' customClasses='w-auto font-bold '>
                        {e.item_name}

                        {e.overcharge > 0 ? (
                          <Text t='body' customClasses='text-xs flex items-center gap-3'>
                            *Additional Charge:{' '}
                            <Currency
                              amount={e.overcharge}
                              currencyCode={selectedInvoice.currency_code}
                              customClasses='text-xs font-semibold text-danger'
                            />
                          </Text>
                        ) : null}
                      </Text>
                    </th>
                    <td className='px-6 py-4'>
                      <Text t='body' customClasses='text-secondary_light_hover font-bold text-right font-monospace '>
                        {e.item_amount}
                      </Text>
                    </td>
                    <td className='px-6 py-4'>
                      <Currency
                        amount={e.overcharge}
                        currencyCode={selectedInvoice.currency_code}
                        customClasses='text-secondary_light_hover font-bold text-right'
                      />
                    </td>
                    <td className='px-6 py-4'>
                      <Currency
                        amount={e.total}
                        currencyCode={selectedInvoice.currency_code}
                        customClasses='font-bold text-right'
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

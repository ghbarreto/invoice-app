import React from 'react';

import { Container, Text, FormatDate, InvoiceIdFormat, Currency } from '@/components';
import { useInvoices } from '@/stores/invoices/store';
import { InvoiceItems } from './InvoiceItems';

export const InvoiceInfo = () => {
  const { selectedInvoice } = useInvoices();

  if (Object.keys(selectedInvoice).length === 0) return;

  const business = [
    selectedInvoice.business.address,
    selectedInvoice.business.city,
    selectedInvoice.business.zip,
    selectedInvoice.business.country,
  ];

  const userAddress = [
    selectedInvoice.address,
    selectedInvoice.city,
    selectedInvoice.zip_code,
    selectedInvoice.country,
  ];

  const txtDetails = (label: string) => (
    <Text t='body' customClasses='font-normal text-secondary_light_hover mt-1.5 dark:font-light'>
      {label}
    </Text>
  );

  return (
    <Container customClasses='md:p-5'>
      <div className='block md:-mb-5 md:flex md:justify-between'>
        <div>
          <InvoiceIdFormat>{selectedInvoice.invoice_id}</InvoiceIdFormat>

          <Text t='body' customClasses='text-secondary_light_hover font-light mt-2'>
            {selectedInvoice.description}
          </Text>
        </div>
        <div className=' md:text-right'>
          {business.map((item, index) => {
            return <React.Fragment key={item + index}>{txtDetails(item)}</React.Fragment>;
          })}
        </div>
      </div>

      <div className='mt-12 flex w-auto flex-wrap items-baseline gap-12 md:-mt-3 md:gap-24'>
        <div>
          <Text t='body' customClasses='font-medium dark:font-light' color={7}>
            Invoice Date
          </Text>
          <Text t='body' customClasses='mt-3 font-bold w-max-content' color={8}>
            <FormatDate d={selectedInvoice.created_at} />
          </Text>

          <Text t='body' customClasses='font-medium dark:font-light mt-20 md:mt-5' color={7}>
            Payment Due
          </Text>
          <Text t='body' customClasses='mt-3 font-bold w-max-content' color={8}>
            <FormatDate d={selectedInvoice.date_due} />
          </Text>
        </div>

        <div>
          <Text t='body' customClasses='mt-3 font-bold font-medium dark:font-light' color={7}>
            Bill to
          </Text>
          <Text t='body' customClasses='mt-3 font-bold capitalize' color={8}>
            {selectedInvoice.first_name} {selectedInvoice.last_name}
          </Text>

          {userAddress.map((item, index) => {
            return <React.Fragment key={item + index}>{txtDetails(item)}</React.Fragment>;
          })}
        </div>

        <div className='md:mt-10'>
          <Text t='body' customClasses='font-heavy dark:font-light' color={7}>
            Sent to
          </Text>
          <Text t='body' customClasses='mt-3 font-bold' color={8}>
            {selectedInvoice.client_email}
          </Text>
        </div>
      </div>

      {!!selectedInvoice.items && <InvoiceItems />}

      <Container customClasses='items-center p-3 bg-btn_bg rounded-none rounded-br-xl rounded-bl-xl dark:bg-secondary_black'>
        <div className='-ml-2 flex items-center justify-between'>
          <Text t='body' customClasses='font-light text-white'>
            Grand Total
          </Text>

          <Currency
            amount={selectedInvoice.total}
            currencyCode={selectedInvoice.currency_code}
            customClasses={`text-2xl text-white font-semibold font-sans`}
          />
        </div>
      </Container>
    </Container>
  );
};

import React from 'react';

import { Container, Text, FormatDate, InvoiceIdFormat, Currency } from '@/components';
import { useInvoices } from '@/pages/dashboard/store';
import { InvoiceItems } from './InvoiceItems';

export const InvoiceInfo = () => {
  const { selectedInvoice } = useInvoices();

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
    <Text t='body-variant' customClasses='font-normal text-secondary_light_hover mt-1.5 dark:font-light'>
      {label}
    </Text>
  );

  return (
    <Container>
      <InvoiceIdFormat>{selectedInvoice.invoice_id}</InvoiceIdFormat>
      <Text t='body-variant' customClasses='text-secondary_light_hover font-normal mt-1'>
        {selectedInvoice.description}
      </Text>

      <div className='block mt-8'>
        {business.map((item, index) => {
          return <React.Fragment key={item + index}>{txtDetails(item)}</React.Fragment>;
        })}
      </div>

      <div className='mt-3 w-max gap-12 flex items-baseline'>
        <div>
          <Text t='body-variant' customClasses='font-normal dark:font-light' color={7}>
            Invoice Date
          </Text>
          <Text t='heading-medium-variant' customClasses='mt-3 w-max-content' color={8}>
            <FormatDate d={selectedInvoice.date_due} />
          </Text>

          <Text t='body-variant' customClasses='font-normal dark:font-light mt-5' color={7}>
            Payment Due
          </Text>
          <Text t='heading-medium-variant' customClasses='mt-3 w-max-content' color={8}>
            <FormatDate d={selectedInvoice.date_due} />
          </Text>
        </div>

        <div>
          <Text t='body-variant' customClasses='mt-3 font-normal dark:font-light' color={7}>
            Bill to
          </Text>
          <Text t='heading-medium-variant' customClasses='mt-3 capitalize' color={8}>
            {selectedInvoice.first_name} {selectedInvoice.last_name}
          </Text>

          {userAddress.map((item, index) => {
            return <React.Fragment key={item + index}>{txtDetails(item)}</React.Fragment>;
          })}
        </div>
      </div>

      <div className='mt-10 '>
        <Text t='body-variant' customClasses='mt-3 font-normal dark:font-light' color={7}>
          Sent to
        </Text>
        <Text t='heading-medium-variant' customClasses='mt-3' color={8}>
          {selectedInvoice.client_email}
        </Text>
      </div>

      <InvoiceItems />

      <Container customClasses='-mt-6 items-center p-3 bg-btn_bg rounded-none rounded-br-xl rounded-bl-xl'>
        <div className='-ml-2 flex justify-between items-center'>
          <Text t='heading-medium-variant' customClasses='font-light text-white'>
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

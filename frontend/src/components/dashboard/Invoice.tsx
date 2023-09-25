import React from 'react';
import { format } from 'date-fns';

import { Currency, Text, Container } from '@/components';
import { Invoice as TInvoice } from '@/types/invoice_types';
import { Tag } from '../base/Tag';
import router from 'next/router';
import { useInvoices } from '@/pages/dashboard/store';

type InvoiceProps = {
  invoice: TInvoice;
};

export const Invoice = ({ invoice }: InvoiceProps) => {
  const { invoices, setSelectedInvoice } = useInvoices();
  const date = new Date(invoice.date_due);

  return (
    <Container
      customClasses={'hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer'}
      onClick={() => {
        const findInvoice = invoices.find((i) => i.invoice_id === invoice.invoice_id) as TInvoice;
        setSelectedInvoice(findInvoice);
        router.push('/dashboard/invoice/[id]', `/dashboard/invoice/${invoice.invoice_id}`);
      }}
    >
      <div className='flex justify-between items-baseline'>
        <div className='flex items-baseline'>
          <Text t='heading-small' customClasses='text-md text-secondary_dark'>
            #
          </Text>
          <Text t='heading-small' customClasses='text-md'>
            {invoice.invoice_id}
          </Text>
        </div>

        <div>
          <Text t='body-variant' customClasses='text-secondary_dark capitalize'>
            {invoice.first_name} {invoice.last_name}
          </Text>
        </div>
      </div>

      <div className='flex justify-between pt-5'>
        <Text t='body-variant' customClasses='text-secondary_dark font-light'>
          Due {format(date, 'dd MMM yyyy')}
          <Currency amount={invoice.total} currencyCode={invoice.currency_code} customClasses='pt-3' />
        </Text>
        <div>
          <Tag t={invoice.status as 'pending' | 'paid' | 'overdue' | 'draft'}>{invoice.status}</Tag>
        </div>
      </div>
    </Container>
  );
};

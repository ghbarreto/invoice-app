import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

import { Currency, Text, Container, InvoiceIdFormat } from '@/components';
import { Invoice as TInvoice } from '@/types/invoice_types';
import { Tag } from '../base/Tag';
import router from 'next/router';
import { useInvoices } from '@/pages/dashboard/store';
import arrowDown from '/public/arrow-down.svg';

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
      <div className='block md:hidden'>
        <div className='flex items-baseline justify-between'>
          <div className='flex items-baseline'>
            <InvoiceIdFormat>{invoice.invoice_id}</InvoiceIdFormat>
          </div>

          <div>
            <Text t='body-small' customClasses='text-secondary_dark capitalize'>
              {invoice.first_name} {invoice.last_name}
            </Text>
          </div>
        </div>

        <div className='flex justify-between pt-5'>
          <Text t='body-small' customClasses='text-secondary_dark font-medium'>
            Due {format(date, 'dd MMM yyyy')}
            <Currency amount={invoice.total} currencyCode={invoice.currency_code} customClasses='pt-3' />
          </Text>
          <Tag t={invoice.status as 'pending' | 'paid' | 'overdue' | 'draft'}>{invoice.status}</Tag>
        </div>
      </div>

      {/* desktop */}
      <div className='hidden items-baseline justify-between px-3 md:flex'>
        <InvoiceIdFormat>{invoice.invoice_id}</InvoiceIdFormat>
        <Text t='body-small' customClasses='text-secondary_dark font-medium'>
          Due {format(date, 'dd MMM yyyy')}
        </Text>
        <Text t='body-small' customClasses='text-secondary_dark capitalize'>
          {invoice.first_name} {invoice.last_name}
        </Text>

        <Currency
          amount={invoice.total}
          currencyCode={invoice.currency_code}
          customClasses='pt-3 font-sans font-bold'
        />

        <Tag t={invoice.status as 'pending' | 'paid' | 'overdue' | 'draft'}>{invoice.status}</Tag>

        <Image src={arrowDown} alt='arrow' width={15} height={15} className='rotate-[270deg]' />
      </div>
    </Container>
  );
};

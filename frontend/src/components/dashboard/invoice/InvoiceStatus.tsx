import React from 'react';

import { useInvoices } from '@/stores/invoices/store';
import { Text, Tag, Container } from '@/components/base';
import { InvoiceActions } from './InvoiceActions';

export const InvoiceStatus = () => {
  const { selectedInvoice } = useInvoices();

  return (
    <Container>
      <div className='flex items-center justify-between md:pl-5'>
        <div className='flex w-full items-center justify-between gap-8 md:w-auto'>
          <Text t='body-small' customClasses='text-[#858BB2] font-light'>
            Status
          </Text>
          <Tag t={selectedInvoice.status}>{selectedInvoice.status}</Tag>
        </div>
        <div className='hidden md:block'>
          <InvoiceActions />
        </div>
      </div>
    </Container>
  );
};

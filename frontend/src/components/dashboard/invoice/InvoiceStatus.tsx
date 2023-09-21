import React from 'react';

import { useInvoices } from '@/pages/dashboard/store';
import { Text, Tag, Container } from '@/components/base';

export const InvoiceStatus = () => {
  const { selectedInvoice } = useInvoices();

  return (
    <Container>
      <div className='flex items-center justify-between'>
        <Text t='body-variant' customClasses='text-[#858BB2]'>
          Status
        </Text>
        <Tag t={selectedInvoice.status}>{selectedInvoice.status}</Tag>
      </div>
    </Container>
  );
};

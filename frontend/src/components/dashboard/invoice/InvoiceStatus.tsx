import React from 'react';

import { useInvoices } from '@/pages/dashboard/store';
import { Text, Tag, Container, Button } from '@/components/base';

export const InvoiceStatus = () => {
  const { selectedInvoice } = useInvoices();

  return (
    <Container>
      <div className='flex items-center justify-between'>
        <Text t='body-variant' customClasses='text-[#858BB2]'>
          Status
        </Text>

        <div className='flex justify-center gap-3'>
          {/* <Button type='third' txt='Edit' onClick={() => router.push(`edit/${invoiceId}`)} /> */}
          <Button type='delete' txt='Delete' />
          <Button type='primary' txt='Mark as Paid' />
        </div>
        <Tag t={selectedInvoice.status}>{selectedInvoice.status}</Tag>
      </div>
    </Container>
  );
};

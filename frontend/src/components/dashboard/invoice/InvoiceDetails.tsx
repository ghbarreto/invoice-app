import React from 'react';

import { useInvoices } from '@/pages/dashboard/store';
import { InvoiceStatus } from './InvoiceStatus';
import { InvoiceInfo } from './InvoiceInfo';
import { Container } from '@/components';

export const InvoiceDetails = () => {
  const { selectedInvoice } = useInvoices();

  return (
    <>
      <InvoiceStatus />
      <InvoiceInfo />
    </>
  );
};

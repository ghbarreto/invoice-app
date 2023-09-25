import { useRouter } from 'next/router';

import { Container, PageLayout } from '@/components';

import React from 'react';

import { Button } from '@/components';
import Head from 'next/head';
import { InvoiceStatus, InvoiceInfo } from '@/components/dashboard';
import { useInvoices } from '../../store';

export const EditInvoice = () => {
  const { selectedInvoice } = useInvoices();
  const router = useRouter();

  return (
    <PageLayout hasReturnArrow returnFunc={() => router.push(`/dashboard/invoice/${selectedInvoice.invoice_id}`)}>
      <Head>
        <title>Edit Invoice #{selectedInvoice.invoice_id}</title>
      </Head>
      <Container customClasses='-ml-5 -mb-5 -mr-5 rounded-none'>Edit</Container>
    </PageLayout>
  );
};

export default EditInvoice;

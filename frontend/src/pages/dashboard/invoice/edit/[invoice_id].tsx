import { useRouter } from 'next/router';

import { Container, InvoiceIdFormat, PageLayout } from '@/components';

import React from 'react';

import { Text } from '@/components';
import Head from 'next/head';
import { useInvoices } from '../../store';

export const EditInvoice = () => {
  const { selectedInvoice } = useInvoices();
  const router = useRouter();

  return (
    <PageLayout
      hasReturnArrow
      returnFunc={() => router.push(`/dashboard/invoice/${selectedInvoice.invoice_id}`)}
      customClasses='bg-white'
    >
      <Head>
        <title>Edit Invoice #{selectedInvoice.invoice_id}</title>
      </Head>

      <Container customClasses='bg-transparent dark:bg-background_dark shadow-none -m-5 mt-2'>
        <Text tag='h1' t='heading-medium' customClasses='flex gap-2'>
          Edit <InvoiceIdFormat>{selectedInvoice.invoice_id}</InvoiceIdFormat>
        </Text>
      </Container>
    </PageLayout>
  );
};

export default EditInvoice;

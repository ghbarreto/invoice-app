import { useRouter } from 'next/router';

import { Container, InvoiceIdFormat, PageLayout } from '@/components';

import React from 'react';

import { Text } from '@/components';
import Head from 'next/head';
import { useInvoices } from '../../store';
import { useFetchInvoice } from '@/hooks/invoices/useFetchInvoices';

export const EditInvoice = () => {
  const { selectedInvoice } = useInvoices();
  const { error, isLoading } = useFetchInvoice();
  const router = useRouter();

  return (
    <PageLayout
      isLoading={isLoading || !selectedInvoice}
      error={error}
      hasReturnArrow
      returnFunc={() => router.push(`/dashboard/invoice/${selectedInvoice.invoice_id}`)}
      customClasses='bg-white'
    >
      <Head>
        <title>Edit Invoice #{selectedInvoice?.invoice_id}</title>
      </Head>

      <Container customClasses='bg-transparent dark:bg-background_dark shadow-none -m-5 mt-2'>
        <Text tag='h1' t='body' customClasses='flex gap-2'>
          Edit <InvoiceIdFormat>{selectedInvoice?.invoice_id}</InvoiceIdFormat>
        </Text>
      </Container>
    </PageLayout>
  );
};

export default EditInvoice;

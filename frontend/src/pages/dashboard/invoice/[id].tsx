import { useRouter } from 'next/router';

import { Container, PageLayout } from '@/components';

import React, { useEffect } from 'react';

import { useInvoices } from '@/pages/dashboard/store';
import { Button } from '@/components';
import Head from 'next/head';
import { InvoiceStatus, InvoiceInfo } from '@/components/dashboard';
import { useFetchInvoice } from '@/hooks/invoices/useFetchInvoices';
import { Invoice } from '@/types/invoice_types';
import { InvoiceActions } from '@/components/dashboard/invoice/InvoiceActions';

export const Info = () => {
  const { push } = useRouter();
  const { selectedInvoice } = useInvoices();
  const { error, isLoading } = useFetchInvoice();

  return (
    <PageLayout
      hasReturnArrow
      returnFunc={() => push('/dashboard')}
      isLoading={isLoading || !selectedInvoice}
      error={error}
    >
      <Head>
        <title>Invoice #{selectedInvoice?.invoice_id}</title>
      </Head>
      <InvoiceStatus />
      <InvoiceInfo />
      <Container customClasses='-ml-5 -mb-5 -mr-5 rounded-none md:hidden'>
        <InvoiceActions />
      </Container>
    </PageLayout>
  );
};

export default Info;

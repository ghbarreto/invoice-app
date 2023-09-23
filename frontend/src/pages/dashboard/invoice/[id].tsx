import { useRouter } from 'next/router';

import { PageLayout } from '@/components';

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useInvoices } from '@/pages/dashboard/store';
import { Button } from '@/components';
import { useAuth } from '@/context/auth-context';
import { secureFetch } from '@/utils/fetch';
import { Invoice } from '@/types/invoice_types';
import Head from 'next/head';
import { InvoiceStatus, InvoiceInfo } from '@/components/dashboard';

export const Info = () => {
  const { push } = useRouter();
  const { user } = useAuth();

  const { selectedInvoice, setSelectedInvoice } = useInvoices();
  const [error, setError] = useState(false);
  const router = useRouter();
  const invoiceId = router.query.id;

  const { isLoading, refetch } = useQuery('invoice_id', () => secureFetch(`invoice/${invoiceId}`), {
    onSettled: (data) => {
      if (!data) return;

      setSelectedInvoice(data.data as Invoice);
      setError(false);
    },
    onError: () => {
      setError(true);
    },
    retry: 2,
    enabled: !!user,
  });

  useEffect(() => {
    if (!selectedInvoice && invoiceId) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId, selectedInvoice]);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>There was an error</div>;
  if (!selectedInvoice) return 'loading';

  return (
    <PageLayout hasReturnArrow returnFunc={() => push('/dashboard')}>
      <Head>
        <title>Invoice #{invoiceId}</title>
      </Head>
      <InvoiceStatus />
      <InvoiceInfo />
      <div className='bg-white -m-5 mt-12 p-5 flex justify-center gap-3'>
        <Button type='third' txt='Edit' onClick={() => router.push('edit')} />
        <Button type='delete' txt='Delete' />
        <Button type='primary' txt='Mark as Paid' />
      </div>
    </PageLayout>
  );
};

export default Info;

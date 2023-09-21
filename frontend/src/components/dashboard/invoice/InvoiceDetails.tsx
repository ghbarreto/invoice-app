import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useInvoices } from '@/pages/dashboard/store';
import { InvoiceStatus } from './InvoiceStatus';
import { InvoiceInfo } from './InvoiceInfo';
import { Button } from '@/components';
import { useAuth } from '@/context/auth-context';
import { secureFetch } from '@/utils/fetch';
import { Invoice } from '@/types/invoice_types';
import Head from 'next/head';

export const InvoiceDetails = () => {
  const { user } = useAuth();
  const { selectedInvoice, setSelectedInvoice } = useInvoices();
  const [error, setError] = useState(false);
  const router = useRouter();
  const invoiceId = router.query.id;

  const { isLoading, refetch } = useQuery('invoice_id', () => secureFetch(`invoice/${invoiceId}`), {
    onSettled: (data: any) => {
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
    <>
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
    </>
  );
};

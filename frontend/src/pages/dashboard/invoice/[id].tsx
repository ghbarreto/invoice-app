import { useRouter } from 'next/router';

import { Container, PageLayout } from '@/components';

import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getCookies } from 'cookies-next';

import { useInvoices } from '@/pages/dashboard/store';
import { Button } from '@/components';
import { useAuth } from '@/context/auth-context';
import { secureFetch, SSRFetch } from '@/utils/fetch';
import { Invoice } from '@/types/invoice_types';
import Head from 'next/head';
import { InvoiceStatus, InvoiceInfo } from '@/components/dashboard';
import { getInvoice } from '@/apis/invoice/getInvoice';

export const Info = () => {
  const { push } = useRouter();
  const { user } = useAuth();
  console.log(getCookies());
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
      <Container customClasses='-ml-5 -mb-5 -mr-5 rounded-none'>
        <div className='flex justify-center gap-3 '>
          <Button type='third' txt='Edit' onClick={() => router.push(`edit/${invoiceId}`)} />
          <Button type='delete' txt='Delete' />
          <Button type='primary' txt='Mark as Paid' />
        </div>
      </Container>
    </PageLayout>
  );
};

export default Info;

// export async function getServerSideProps(ctx: any) {
//   const { id, req } = ctx.params;

//   if (id) {
//     try {
//       const response: Response = await fetch(`http://localhost:8080/api/invoice/${id}`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'Bearer ' + ctx.req.cookies.auth_token,
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log(response);
//       // const invoice = await SSRFetch(`invoice/${id}`, { auth: ctx.req.cookies.auth_token });
//     } catch (err) {
//       console.log(err);
//     }
//     return {
//       props: {
//         invoice: [],
//       },
//     };
//   }
// }

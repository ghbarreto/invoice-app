import React from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import { Button, Text } from '@/components';
import { useQuery } from 'react-query';
import { secureFetch } from '@/utils/fetch';
import { useInvoices } from './store';
import arrowDown from '/public/arrow-down.svg';
import { Invoice as TInvoice } from '@/types/invoice_types';
import { Invoice } from '@/components/dashboard';
import { PageLayout } from '@/components/base/PageLayout';
import ilustration from '/public/illustration-empty.svg';

const Dashboard = () => {
  const { user, token } = useAuth();
  const { setState, invoices, invoicesCount } = useInvoices();

  const { isLoading, error } = useQuery({
    queryKey: ['test'],
    queryFn: async () => await secureFetch('invoices', { method: 'GET' }),
    onSettled: (data) => setState(data.data),
    enabled: !!user,
  });

  return (
    <PageLayout>
      <div className='break-words flex gap-2 -mt-6'>
        <details>
          <summary></summary>
          <p className='w-80'>{token}</p>
        </details>
        {user?.uid}
      </div>
      <section
        id='dashboard-title'
        aria-labelledby='dashboard-title'
        className='mt-3 flex items-baseline justify-between'
      >
        <div>
          <Text t='heading-medium' tag='h1' id='dashboard-title'>
            Invoices
          </Text>
          <Text t='body' customClasses='text-secondary_dark font-medium mt-1'>
            {invoicesCount} invoices
          </Text>
        </div>

        <div className='flex items-center gap-5'>
          <div className='flex gap-3 items-baseline'>
            <Text tag='p' t='heading-small-variant' customClasses='text-md'>
              Filter
            </Text>
            <Image src={arrowDown} onClick={() => null} alt='arrow-down' width={15} height={15} />
          </div>

          <Button type='primary' hasPlusSign txt='New' />
        </div>
      </section>
      {isLoading ? <div>loading...</div> : null}

      {invoices?.length > 0 ? (
        invoices.map((invoice: TInvoice, index: number) => {
          return <Invoice key={invoice.first_name + index} invoice={invoice} />;
        })
      ) : (
        <>
          <div className=' min-h-20 flex justify-center items-center'>
            <div className='block m-auto'>
              <Image
                src={ilustration}
                width={200}
                height={200}
                alt='no invoices'
                className='flex justify-center w-full object-contain'
              />
              <Text t='heading-medium' customClasses='mt-10'>
                There is nothing here
              </Text>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default Dashboard;

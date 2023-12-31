import React, { useState } from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import { Button, Text } from '@/components';
import { useInvoices } from './store';
import arrowDown from '/public/arrow-down.svg';
import { Invoice as TInvoice } from '@/types/invoice_types';
import { Invoice } from '@/components/dashboard';
import { PageLayout } from '@/components/base/PageLayout';
import ilustration from '/public/illustration-empty.svg';
import Head from 'next/head';
import { useFetchAllInvoices } from '@/hooks/invoices/useFetchInvoices';
import { FilterDropdown } from '@/components/dashboard';
import Link from 'next/link';

const Dashboard = () => {
  const { user, token } = useAuth();
  const { setState, invoices, invoicesCount } = useInvoices();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, error } = useFetchAllInvoices();

  return (
    <PageLayout isLoading={isLoading} error={error}>
      <Head>
        <title>Welcome {user?.displayName}</title>
      </Head>
      <div className='-mt-6 flex gap-2 break-words'>
        <details>
          <summary></summary>
          <p className='w-full max-w-3xl overflow-scroll  font-bold dark:text-primary'>{token}</p>
        </details>
        {user?.uid}
      </div>
      <section
        id='dashboard-title'
        aria-labelledby='dashboard-title'
        className='mb-10 mt-3 flex items-baseline justify-between'
      >
        <div>
          <Text t='title' tag='h1' id='dashboard-title'>
            Invoices
          </Text>
          <Text
            t='body'
            customClasses='text-secondary_dark font-medium mt-1 md:before:content-["There_are_"] md:after:content-["_total_invoices"] after:content-["_invoices"] xl:before:content-["There_are_"]  xl:after:content-["_pending_invoices"]'
          >
            {invoicesCount}
          </Text>
        </div>

        <div className='flex items-center gap-3 hover:cursor-pointer md:gap-8'>
          <div className='flex items-baseline gap-2'>
            <Text
              tag='p'
              t='body'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              customClasses="md:after:content-['_by_status'] md:mr-2 font-bold"
            >
              Filter
            </Text>
            <Image
              src={arrowDown}
              alt='arrow-down'
              className={isOpen ? 'rotate-180 transform' : ''}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              width={15}
              height={15}
            />
            <div className='relative'>
              <div className='absolute'>{isOpen && <FilterDropdown />}</div>
            </div>
          </div>

          <Link href='/dashboard/invoice/create'>
            <Button type='primary' hasPlusSign txt='New' textClasses="md:after:content-['_Invoice']" />
          </Link>
        </div>
      </section>

      {invoices?.length > 0 ? (
        invoices.map((invoice: TInvoice, index: number) => {
          return <Invoice key={invoice.first_name + index} invoice={invoice} />;
        })
      ) : (
        <>
          <div className=' min-h-20 flex items-center justify-center'>
            <div className='m-auto block'>
              <Image
                src={ilustration}
                width={200}
                height={200}
                alt='no invoices'
                className='flex w-full justify-center object-contain'
              />
              <Text t='body' customClasses='mt-10'>
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

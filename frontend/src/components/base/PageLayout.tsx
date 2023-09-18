import { ProtectedRoute } from '@/context/auth-context';
import { Navigation } from '@/components';
import React from 'react';
import { useInvoices } from '@/pages/dashboard/store';

export const PageLayout = (props: { children: React.ReactNode }) => {
  const { invoices } = useInvoices();

  return (
    <ProtectedRoute>
      <header>
        <Navigation />
      </header>

      {invoices.length <= 0 ? (
        <div>loading...</div>
      ) : (
        <main className={'h-100 min-h-screen items-center bg-background_light dark:bg-background_dark p-5'}>
          <div className='max-w-7xl m-auto'>{props.children}</div>
        </main>
      )}
    </ProtectedRoute>
  );
};

export const Container = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...props} className='bg-white mt-5 rounded-md mb-5 dark:bg-dark_primary shadow-normal'>
      <div className='p-5'>{props.children}</div>
    </div>
  );
};

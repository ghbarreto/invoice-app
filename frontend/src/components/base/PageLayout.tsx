import { ProtectedRoute } from '@/context/auth-context';
import { Navigation } from '@/components';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export const PageLayout = (props: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <header>
        <Navigation />
      </header>

      <main className={'h-100 min-h-screen items-center bg-background_light dark:bg-background_dark p-5'}>
        <div className='max-w-7xl m-auto'>{props.children}</div>
      </main>
    </ProtectedRoute>
  );
};

type TContainer = {
  customClasses?: string;
};

export const Container = (props: React.HTMLProps<HTMLDivElement> & TContainer) => {
  return (
    <div
      {...props}
      className={twMerge(`bg-white mt-5 rounded-md mb-5 dark:bg-dark_primary shadow-normal ${props.customClasses}`)}
    >
      <div className='p-5'>{props.children}</div>
    </div>
  );
};

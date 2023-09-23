import React from 'react';
import { twMerge } from 'tailwind-merge';

import Image from 'next/image';

import { Text } from '@/components';
import arrow from '/public/arrow-down.svg';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components';

export const PageLayout = (props: { children: React.ReactNode; hasReturnArrow?: boolean; returnFunc?: () => void }) => {
  return (
    <ProtectedRoute>
      <header>
        <Navigation />
      </header>

      <main className={'h-100 min-h-screen items-center bg-background_light dark:bg-background_dark p-5'}>
        <div className='max-w-7xl m-auto'>
          {props.hasReturnArrow && (
            <div className='pt-2 hover:cursor-pointer w-max'>
              <div className='flex' onClick={props.returnFunc}>
                <Image src={arrow} alt='arrow-down' width={10} height={10} className='rotate-90' />

                <Text t='heading-small' customClasses='ml-5'>
                  Go back
                </Text>
              </div>
            </div>
          )}
          {props.children}
        </div>
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

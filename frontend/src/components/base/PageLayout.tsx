import React from 'react';
import { twMerge } from 'tailwind-merge';

import Image from 'next/image';

import { Text } from '@/components';
import arrow from '/public/arrow-down.svg';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components';

export const PageLayout = (props: {
  children: React.ReactNode;
  hasReturnArrow?: boolean;
  returnFunc?: () => void;
  customClasses?: string;
}) => {
  return (
    <ProtectedRoute>
      <header>
        <Navigation />
      </header>

      <main
        className={twMerge(
          `h-100 min-h-screen items-center bg-background_light p-5 dark:bg-background_dark xl:pl-20 ${props.customClasses}`
        )}
      >
        <div className='m-auto max-w-7xl xl:max-w-5xl'>
          {props.hasReturnArrow && (
            <div className='w-max pt-2 hover:cursor-pointer'>
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
      className={twMerge(`mb-5 mt-5 rounded-md bg-white shadow-sm dark:bg-dark_primary ${props.customClasses}`)}
    >
      <div className='p-5'>{props.children}</div>
    </div>
  );
};

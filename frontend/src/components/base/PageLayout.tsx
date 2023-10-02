import React from 'react';
import { twMerge } from 'tailwind-merge';

import Image from 'next/image';

import { Text } from '@/components';
import arrow from '/public/arrow-down.svg';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Navigation } from '@/components';
import Link from 'next/link';

export const PageLayout = (props: {
  children: React.ReactNode;
  hasReturnArrow?: boolean;
  returnHref?: string;
  customClasses?: string;
  isLoading?: boolean;
  error?: unknown;
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
        <div className='m-auto max-w-4xl '>
          {props.hasReturnArrow && (
            <div className='w-max pt-2 hover:cursor-pointer'>
              <Link className='flex' href={props.returnHref || '/dashboard'}>
                <Image src={arrow} alt='arrow-down' width={10} height={10} className='rotate-90' />

                <Text t='body' customClasses='ml-5 font-bold' tag='p'>
                  Go back
                </Text>
              </Link>
            </div>
          )}
          {props.error ? 'There was an error' : props.isLoading ? 'loading' : props.children}
        </div>
      </main>
    </ProtectedRoute>
  );
};

export const Container = ({
  children,
  customClasses,
  onClick,
  ...props
}: {
  onClick?: () => void;
  props?: React.HTMLProps<HTMLDivElement>;
  children: React.ReactNode;
  customClasses?: string;
}) => {
  return (
    <div
      onClick={onClick}
      {...props}
      className={twMerge(
        `m-auto mb-5 mt-5 max-w-4xl rounded-md bg-white shadow-sm dark:bg-dark_primary ${customClasses}`
      )}
    >
      <div className='p-5'>{children}</div>
    </div>
  );
};

import React from 'react';
import Image from 'next/image';

import { useAuth, ProtectedRoute } from '@/context/auth-context';
import { Button, SelectBox, Input, DatePicker, LoginForm, Navigation, Text } from '@/components';
import { useQuery } from 'react-query';
import { secureFetch } from '@/utils/fetch';
import arrowDown from '/public/arrow-down.svg';

const Dashboard = () => {
    const { user, token } = useAuth();

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: async () => {
    //         for (let i = 0; i < 100; i++) {
    //             return await secureFetch('invoices', { method: 'GET' });
    //         }
    //     },
    //     enabled: !!user,
    // });

    const { isLoading, error, data } = useQuery({
        queryKey: ['test'],
        queryFn: async () => await secureFetch('invoices', { method: 'GET' }),
        enabled: !!user,
    });

    const invoices = data?.data?.invoices;

    return (
        <ProtectedRoute>
            <header>
                <Navigation />
            </header>
            {!data ? (
                <div>loading...</div>
            ) : (
                <main className={`h-screen items-center bg-background_light dark:bg-background_dark p-5`}>
                    <section
                        id='dashboard-title'
                        aria-labelledby='dashboard-title'
                        className='mt-3 flex items-baseline justify-between'
                    >
                        <div>
                            <Text t='heading-medium' tag='h1' id='dashboard-title'>
                                Invoices
                            </Text>
                            <Text t='body' customClasses='text-secondary_dark font-medium'>
                                {data?.data?.invoices_count} invoices
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
                    {user?.uid}
                    {invoices?.length > 0
                        ? invoices.map((e: any, i: number) => {
                              const { items } = e;
                              const color = i % 2 === 0 ? 'bg-primary' : 'bg-danger';
                              return (
                                  <div key={e.name} className={`mt-5 ${color}`}>
                                      {e.first_name}
                                      {e.description}ddddd
                                      {items?.map((v: any) => {
                                          console.log(v);
                                          return (
                                              <article key={v.invoice_id}>
                                                  <Text t='heading-small'>
                                                      {/* {v.item_name} {v.item_amount} {v.price} {v.total} */}
                                                  </Text>
                                              </article>
                                          );
                                      })}
                                      <hr />
                                  </div>
                              );
                          })
                        : null}
                    <div
                        style={{
                            width: '100%',
                        }}
                    >
                        <div className='mt-3 break-words'>
                            <strong>token:</strong>
                            <details>{token}</details>
                        </div>
                    </div>
                </main>
            )}
        </ProtectedRoute>
    );
};

export default Dashboard;

import React from 'react';
import { format } from 'date-fns';

import { Currency, Text } from '@/components';
import { InvoiceStatus, Invoice as TInvoice } from '@/types/invoice_types';
import { Tag } from './Tag';

type InvoiceProps = {
    invoice: TInvoice;
};

export const Invoice = ({ invoice }: InvoiceProps) => {
    const date = new Date(invoice.date_due);

    return (
        <div className='bg-white mt-5 rounded-md mb-5'>
            <div className='flex p-5 justify-between items-baseline'>
                <div className='flex items-baseline'>
                    <Text t='heading-small' customClasses='text-md text-secondary_dark'>
                        #
                    </Text>
                    <Text t='heading-small' customClasses='text-md'>
                        {invoice.invoice_id}
                    </Text>
                </div>

                <div>
                    <Text t='body-variant' customClasses='text-secondary_dark capitalize'>
                        {invoice.first_name} {invoice.last_name}
                    </Text>
                </div>
            </div>

            <div className='p-2 pl-5 pr-5 pb-5'>
                <div className='flex justify-between'>
                    <Text t='body-variant' customClasses='text-secondary_dark font-light'>
                        Due {format(date, 'dd MMM yyyy')}
                        <Currency amount={invoice.total} currencyCode={invoice.currency_code} />
                    </Text>
                    <div>
                        <Tag t={invoice.status as 'pending' | 'paid' | 'overdue' | 'draft'}>{invoice.status}</Tag>
                    </div>
                </div>
            </div>
        </div>
    );
};

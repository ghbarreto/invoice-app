import React, { useState } from 'react';

import { Invoice, InvoiceKeys } from '@/types/invoice_types';
import { Container, DatePicker, Input, PageLayout, SelectBox, Text } from '@/components';

type ManageInvoice = {
  type: 'edit' | 'create';
  invoice: Invoice;
};

export const ManageInvoice = ({ type, invoice }: ManageInvoice) => {
  const isEditing = type === 'edit';
  const [state, setState] = useState<Invoice>(isEditing ? ({} as Invoice) : invoice);

  const handleStateChange = (property: InvoiceKeys, value: string | number) => {
    setState((state) => ({ ...state, [property]: value }));
  };

  return (
    <PageLayout hasReturnArrow customClasses={'bg-white'}>
      <Container customClasses='shadow-none -ml-5 -mt-0'>
        <form>
          <Text t='title' tag='h1'>
            {isEditing ? 'Edit Invoice' : 'New Invoice'}
          </Text>

          <section className=' pt-7'>
            <Text tag='h3' color={1} t='body-small' customClasses='font-bold pb-5'>
              Bill From
            </Text>

            <div className='grid grid-cols-2 grid-rows-3 gap-4'>
              {billFrom.map((input) => {
                const gridClasses =
                  input.name === 'street_address' || input.name === 'country' ? 'col-span-2' : 'row-start-2';

                return (
                  <span key={input.name} className={gridClasses}>
                    <Input
                      onChange={(e) => handleStateChange(input.name as InvoiceKeys, e.target.value)}
                      label={input.label}
                      name={input.name}
                      value={state[input.name as InvoiceKeys]}
                      labelCustomClasses={`font-normal -ml-0 `}
                    />
                  </span>
                );
              })}
            </div>
          </section>

          <section className='mt-10'>
            <Text tag='h3' color={1} t='body-small' customClasses='font-bold pb-5'>
              Bill To
            </Text>

            <div className='grid-rows-8 grid grid-cols-2 gap-4'>
              {billTo.map((input) => {
                const gridClasses = input.name === 'zip_code' || input.name === 'city' ? 'row-start-4' : 'col-span-2';

                return (
                  <span key={input.name} className={`${gridClasses}`}>
                    {/* {input.name === 'invoice_date' ? <DatePicker /> : null}

                    {input.name === 'payment_terms' ? (
                      <SelectBox
                        label={input.label}
                        values={[{ label: 'string', value: 'string' }]}
                        sel={{ label: 'string', value: 'string' }}
                      />
                    ) : null} */}

                    {input.name !== 'invoice_date' && input.name !== 'payment_terms' && (
                      <Input
                        onChange={(e) => handleStateChange(input.name as InvoiceKeys, e.target.value)}
                        label={input.label}
                        name={input.name}
                        labelCustomClasses={`font-normal -ml-0`}
                      />
                    )}
                  </span>
                );
              })}
            </div>
          </section>
        </form>
      </Container>
    </PageLayout>
  );
};

export const billFrom = [
  {
    label: 'Street Address',
    name: 'street_address',
  },
  {
    label: 'City',
    name: 'city',
  },
  {
    label: 'Post Code',
    name: 'zip_code',
  },
  {
    label: 'Country',
    name: 'country',
  },
];

export const billTo = [
  {
    label: `Client's Name`,
    name: 'client_name',
  },
  {
    label: `Client's Email`,
    name: 'client_email',
  },
  {
    label: `Street Address`,
    name: 'street_address',
  },
  {
    label: `City`,
    name: 'city',
  },
  {
    label: `Post Code`,
    name: 'zip_code',
  },
  {
    label: `Country`,
    name: 'country',
  },

  {
    label: `Invoice Date`,
    name: 'invoice_date',
  },
  {
    label: `Payment Terms`,
    name: 'payment_terms',
  },
  {
    label: `Project Description`,
    name: 'project_description',
  },
];

import { useState } from 'react';
import router from 'next/router';

import { Button, Modal } from '@/components';
import { useInvoices } from '@/pages/dashboard/store';

export const InvoiceActions = () => {
  const { selectedInvoice } = useInvoices();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Modal isOpen={isOpen} openModal={openModal} type='delete' invoiceId={`#${selectedInvoice.invoice_id}`} />

      <div className='flex justify-center gap-3'>
        <Button type='third' txt='Edit' onClick={() => router.push(`edit/${selectedInvoice.invoice_id}`)} />
        <Button type='delete' txt='Delete' onClick={openModal} />
        <Button type='primary' txt='Mark as Paid' />
      </div>
    </>
  );
};

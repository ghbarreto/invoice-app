import React, { useEffect } from 'react';

import { usePost } from '@/hooks/useFetch';
import { ManageInvoice } from '@/components/dashboard';
import { useInvoices } from '@/stores';

export default function CreateInvoice() {
  const { selectedInvoice } = useInvoices();
  const { mutate } = usePost({
    endpoint: `invoices`,
    options: {
      method: 'POST',
      body: {},
    },
  });

  useEffect(() => {
    // mutate();
  }, []);

  return <ManageInvoice type='create' invoice={selectedInvoice} />;
}

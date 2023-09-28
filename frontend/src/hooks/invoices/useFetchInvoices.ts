import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useFetch } from '@/hooks/useFetch';
import { useInvoices } from '@/pages/dashboard/store';
import { Invoice } from '@/types/invoice_types';

type Fetch = {
  data: Invoice;
  error: unknown;
  isLoading: boolean;
};

export /**
 * invoice id, sample = XL33637
 * @return single invoice for selectedInvoice hook
 */
const useFetchInvoice = (): Fetch => {
  const { selectedInvoice, setSelectedInvoice } = useInvoices();
  const router = useRouter();
  const invoiceId = router.query.id;

  const { refetch, data, error, isLoading } = useFetch({
    endpoint: `invoice/${invoiceId}`,
    id: 'fetch_single_invoice',
  });

  useEffect(() => {
    if (!selectedInvoice && typeof invoiceId !== 'undefined') {
      refetch();
    }
    setSelectedInvoice(data);
  }, [invoiceId, selectedInvoice, data, setSelectedInvoice, refetch]);

  return { data, error, isLoading } as { data: Invoice; error: unknown; isLoading: boolean };
};

export /**
 * fetch all invoices under a user_id
 * @return {Fetch}
 */
const useFetchAllInvoices = (): Fetch => {
  const { setState } = useInvoices();

  const { refetch, data, error, isLoading, isSuccess } = useFetch({
    endpoint: `invoices`,
    id: 'fetch_single_invoice',
    options: {
      method: 'GET',
    },
  });

  useEffect(() => {
    refetch();
    if (isSuccess) {
      setState(data);
    }
    console.log(data);
  }, [data, isSuccess, refetch, setState]);

  return { data, error, isLoading } as { data: Invoice; error: unknown; isLoading: boolean };
};

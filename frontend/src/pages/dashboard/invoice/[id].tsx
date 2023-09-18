import { useRouter } from 'next/router';
import { useInvoices } from '../store';

export const InvoiceInfo = () => {
  const { query } = useRouter();
  const { invoices } = useInvoices();

  const invoice = invoices.find((invoice) => invoice.invoice_id === query.id);

  return (
    <div>
      <h1>
        {invoice?.invoice_id} {invoice?.description}
      </h1>
    </div>
  );
};

export default InvoiceInfo;

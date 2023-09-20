import { useInvoices } from '../../store';

export const EditInvoice = () => {
  const { selectedInvoice } = useInvoices();

  return selectedInvoice.invoice_id;
};

export default EditInvoice;

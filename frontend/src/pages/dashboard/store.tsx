import { InvoiceStatus, Invoice } from '@/types/invoice_types';
import { StoreApi, UseBoundStore, create } from 'zustand';

export type InvoiceState = {
    invoices: Array<Invoice>;
    invoicesCount: number;
    invoicesStatus: InvoiceStatus;
    setState: (res: { invoices: Array<Invoice>; invoices_count: number; invoices_status: InvoiceStatus }) => void;
};

export const useInvoices: UseBoundStore<StoreApi<InvoiceState>> = create((set) => ({
    invoices: [],
    invoicesCount: 0,
    invoicesStatus: {} as InvoiceStatus,
    setState: (res) => {
        set(() => ({
            invoices: res.invoices,
            invoicesCount: res.invoices_count,
            invoicesStatus: res.invoices_status,
        }));
    },
}));

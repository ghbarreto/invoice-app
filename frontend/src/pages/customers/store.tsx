import { StoreApi, UseBoundStore, create } from 'zustand';

export type CustomerState = {
  customers: Array<{
    id: string;
    first_name: string;
    last_name: string;
    address: string;
    country: string;
    city: string;
    client_email: string;
    zip_code: string;
    phone: string;
  }>;
  setState: (res: any) => void;
};

export const useCustomers: UseBoundStore<StoreApi<CustomerState>> = create((set) => ({
  customers: [],
  setState: (res) => {
    if (!res) return;

    set(() => ({
      customers: res,
    }));
  },
}));

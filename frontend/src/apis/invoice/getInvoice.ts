import { secureFetch } from '@/utils/fetch';

export const getInvoice = async (id: string) => {
  return await secureFetch(`invoice/${id}`);
};

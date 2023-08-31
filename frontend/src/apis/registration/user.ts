import { secureFetch } from '@/utils/fetch';

type Body = {
    id: string;
    email: string | null;
    provider_id: string | null;
};

export const authUser = async (body: Body): Promise<void> => {
    return await secureFetch('credentials', { body, method: 'POST' });
};

import Image from 'next/image';
import { useQuery } from 'react-query';

import { useAuth } from '@/context/auth-context';
import { GetServerSideProps } from 'next';
import { secureFetch } from '@/utils/fetch';
import { Button, SelectBox, Input, DatePicker, LoginForm } from '@/components';

export default function Home() {
    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: async () => await secureFetch('invoices', { method: 'POST', body: { uid: user!.uid } }),
    //     enabled: !!user,
    // });

    return (
        <>
            <main className={`flex h-screen items-center bg-background_light dark:bg-background_dark`}>
                <LoginForm />
            </main>
        </>
    );
}

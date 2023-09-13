import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useQuery } from 'react-query';

import { useAuth } from '@/context/auth-context';
import { GetServerSideProps } from 'next';
import { secureFetch } from '@/utils/fetch';
import { Button, Dropdown, Input, DatePicker } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const { user, login, logout, token } = useAuth();

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: async () => await secureFetch('invoices', { method: 'POST', body: { uid: user!.uid } }),
    //     enabled: !!user,
    // });

    const addProp = () => {
        if (document.documentElement.classList.contains('dark')) {
            return document.documentElement.classList.remove('dark');
        }
        return document.documentElement.classList.add('dark');
    };

    return (
        <>
            <main className={`p-10`}>
                <DatePicker />
                <Dropdown
                    label="Payment Terms"
                    values={[
                        {
                            label: 'Net 1 Day',
                            value: '1',
                        },

                        {
                            label: 'Net 7 Days',
                            value: '7',
                        },
                        {
                            label: 'Net 14 Days',
                            value: '14',
                        },

                        {
                            label: 'Net 30 Days',
                            value: '30',
                        },
                    ]}
                    sel={{
                        label: 'Net 30 Days',
                        value: '30',
                    }}
                />
                <Input label="Test" onChange={() => null} value="123" />
                <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                    <div>uid: {user?.uid}</div>
                    <Image
                        onClick={addProp}
                        src={user?.photoURL || '/vercel.svg'}
                        alt="Vercel Logo"
                        width={100}
                        height={24}
                        priority
                    />
                    <div onClick={login}>LOGIN</div>
                    <div onClick={logout}>SIGN OFF</div>
                    <Button type="primary" hasPlusSign txt="New Invoice" />
                </div>
                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <div className="mt-3 break-words">
                        <Button txt="Mark as Paid" type="secondary" />
                        <Button txt="Mark as Paid" type="delete" />
                        <Button txt="Edit" type="third" />
                        <Button txt="Add New Item" type="fourth" />
                        <strong>token:</strong>
                        <p>{token}</p>
                    </div>
                </div>
            </main>
        </>
    );
}

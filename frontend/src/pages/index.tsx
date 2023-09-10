import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useQuery } from 'react-query';

import { useAuth } from '@/context/auth-context';
import { GetServerSideProps } from 'next';
import { secureFetch } from '@/utils/fetch';
import { Button } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const { user, login, logout, token } = useAuth();

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['test'],
    //     queryFn: async () => await secureFetch('invoices', { method: 'POST', body: { uid: user!.uid } }),
    //     enabled: !!user,
    // });

    console.log(user);

    return (
        <main className={` min-h-screen p-24 ${inter.className}`}>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <div>uid: {user?.uid}</div>
                <Image src={user?.photoURL || '/vercel.svg'} alt="Vercel Logo" width={100} height={24} priority />
                <div onClick={login}>LOGIN</div>
                <div onClick={logout}>SIGN OFF</div>
                <Button type="primary" />
                <Button />
            </div>
            <div>
                <div className="mt-3 break-words">
                    <strong>token:</strong>
                    <p>{token}</p>
                </div>
            </div>
        </main>
    );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { user } = useAuth();
//     return {};
// };

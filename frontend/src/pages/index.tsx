import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useQuery } from 'react-query';

import { useAuth } from '@/context/auth-context';
import { GetServerSideProps } from 'next';
import { secureFetch } from '@/utils/fetch';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    const { user, login, logout, token } = useAuth();

    const { isLoading, error, data } = useQuery({
        queryKey: ['test'],
        queryFn: async () => await secureFetch('products'),
    });

    return (
        <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div>uid: {user?.uid}</div>
                <Image src={user?.photoURL || '/vercel.svg'} alt="Vercel Logo" width={100} height={24} priority />
                <div onClick={login}>LOGIN</div>
                <div onClick={logout}>SIGN OFF</div>
            </div>
            <div style={{ maxWidth: '40%', textAlign: 'left' }}>idToken: {token}</div>
        </main>
    );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { user } = useAuth();
//     return {};
// };

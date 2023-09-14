import React from 'react';
import Image from 'next/image';

import { useAuth, AuthCheck } from '@/context/auth-context';
import { Button, SelectBox, Input, DatePicker, LoginForm, Navigation } from '@/components';

const Dashboard = () => {
    const { user, token } = useAuth();

    const addProp = () => {
        if (document.documentElement.classList.contains('dark')) {
            return document.documentElement.classList.remove('dark');
        }
        return document.documentElement.classList.add('dark');
    };

    console.log(typeof window);

    return (
        <AuthCheck>
            <main className={`h-screen items-center bg-background_light dark:bg-background_dark`}>
                <Navigation />

                <div
                    style={{
                        width: '100%',
                    }}
                >
                    <div className='mt-3 break-words'>
                        <strong>token:</strong>
                        <details>{token}</details>
                    </div>
                </div>
            </main>
        </AuthCheck>
    );
};

export default Dashboard;

import React from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import { Button, SelectBox, Input, DatePicker, LoginForm, Navigation } from '@/components';

const Dashboard = () => {
    const { user, token, error } = useAuth();

    const addProp = () => {
        if (document.documentElement.classList.contains('dark')) {
            return document.documentElement.classList.remove('dark');
        }
        return document.documentElement.classList.add('dark');
    };

    return (
        <main className={`h-screen items-center bg-background_light dark:bg-background_dark`}>
            <Navigation />

            <div
                style={{
                    width: '100%',
                }}
            >
                <div className='mt-3 break-words'>
                    <strong>token:</strong>
                    {error != '' ? <p>{error}</p> : null}
                    <details>{token}</details>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;

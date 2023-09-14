import { useState } from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import moon from '/public/moon.svg';
import pacman from '/public/pacman.svg';

import { Text } from '@/components';
import { NavigationDropdown } from './NavigationDropdown';

import { RxAvatar } from 'react-icons/rx';

export const Navigation = () => {
    const { user, token, logout } = useAuth();
    const [navigationOpen, setNavigationOpen] = useState<boolean>(false);

    const openNavigation = () => setNavigationOpen(!navigationOpen);

    return (
        <>
            <ul className='relative flex h-20 items-center overflow-hidden justify-between bg-dark_primary_hover'>
                <span className='mr-5 flex w-full justify-between items-center'>
                    <li className=''>
                        {' '}
                        <Image src={pacman} alt='logo' width={80} height={80} />
                    </li>
                    <li className='border-l-1 flex items-center'>
                        <Image src={moon} alt='moon' width={20} height={20} />
                    </li>
                </span>

                <span className='mr-7 h-96 w-0.5 bg-[#494E6E]'></span>

                <li className='mr-6' onClick={openNavigation}>
                    {user?.photoURL ? (
                        <Image
                            className='rounded-full'
                            src={user?.photoURL}
                            alt='Vercel Logo'
                            width={60}
                            height={60}
                            priority
                        />
                    ) : (
                        <RxAvatar size='40' className='text-[#494E6E]' />
                    )}
                </li>
            </ul>

            {navigationOpen ? <NavigationDropdown logout={logout} /> : null}
        </>
    );
};

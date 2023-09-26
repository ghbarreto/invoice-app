import { useState } from 'react';
import Image from 'next/image';

import { useAuth } from '@/context/auth-context';
import moon from '/public/moon.svg';
import sun from '/public/icon-sun.svg';
import pacman from '/public/pacman.svg';

import { Text } from '@/components';
import { NavigationDropdown } from './NavigationDropdown';

import { RxAvatar } from 'react-icons/rx';

export const Navigation = () => {
  const { user, token, logout } = useAuth();
  const [navigationOpen, setNavigationOpen] = useState<boolean>(false);
  const [dark, setDark] = useState(false);

  const addProp = () => {
    if (document.documentElement.classList.contains('dark')) {
      setDark(!dark);
      return document.documentElement.classList.remove('dark');
    }
    setDark(!dark);
    return document.documentElement.classList.add('dark');
  };

  const openNavigation = () => setNavigationOpen(!navigationOpen);

  return (
    <>
      <ul className='w relative flex h-20 items-center justify-between overflow-hidden bg-dark_primary_hover xl:fixed xl:h-screen xl:w-32 xl:rounded-br-[2.5rem] xl:rounded-tr-[2.5rem]'>
        <span className='mr-5 flex w-full items-center justify-between'>
          <li className='xl:absolute xl:top-0'>
            <Image src={pacman} alt='logo' width={80} height={80} className='xl:w-56' />
          </li>
          <li className='flex items-center xl:absolute xl:bottom-52 xl:left-12  '>
            {dark ? (
              <Image src={moon} onClick={addProp} alt='moon' width={20} height={20} className='xl:w-7' />
            ) : (
              <Image src={sun} onClick={addProp} alt='sun' width={20} height={20} className='xl:w-7' />
            )}
          </li>
        </span>

        <span className='mr-7 h-96 w-0.5 bg-[#494E6E] xl:absolute xl:bottom-40 xl:h-0.5 xl:w-96'></span>

        <li className='mr-6 xl:absolute xl:bottom-10 xl:left-5 xl:right-5 xl:w-full' onClick={openNavigation}>
          {user?.photoURL ? (
            <Image
              className='rounded-full xl:w-20'
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

      {navigationOpen ? <NavigationDropdown /> : null}
    </>
  );
};

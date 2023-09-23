import { Text } from '@/components';
import { ImExit } from 'react-icons/im';

import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { BsPeopleFill } from 'react-icons/bs';
import { IoSettingsSharp } from 'react-icons/io5';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import Link from 'next/link';

export const NavigationDropdown = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const options = [
    { route: '/customers', label: 'Customers' },
    { route: '/dashboard', label: 'Invoices' },
    { route: '/settings', label: 'Settings' },
  ];

  return (
    <div
      className='absolute right-0 z-10 w-56 rounded-tr-none rounded-md bg-dark_primary_hover shadow-normal ring-1 ring-[#494E6E] ring-opacity-5 focus:outline-none'
      role='menu'
      aria-orientation='vertical'
      aria-labelledby='menu-button'
    >
      <div className='py-1 px-4' role='none'>
        {options.map((op, index: number) => {
          const icons: { [T: number]: JSX.Element } = {
            0: <BsPeopleFill className='mr-3 font-bold text-xl text-secondary_dark' />,
            1: <LiaFileInvoiceSolid className='mr-3 font-bold text-xl text-secondary_dark' />,
            2: <IoSettingsSharp className='mr-3 font-bold text-xl text-secondary_dark' />,
          };

          return (
            <Link key={op.label} href={op.route} role='menuitem' id='menu-item-0' className='flex items-center py-2'>
              {icons[index]}
              <Text t='heading-small' customClasses='py-2 text-white font-medium'>
                {op.label}
              </Text>
            </Link>
          );
        })}

        <button className='flex items-center py-2' role='menuitem' id='menu-item-3' onClick={logout}>
          <ImExit className='mr-3 font-bold text-xl text-secondary_dark' />
          <Text t='heading-small' customClasses='py-2 text-white font-medium'>
            Sign out
          </Text>
        </button>
      </div>
    </div>
  );
};

import { useRouter } from 'next/router';

import { PageLayout } from '@/components';
import { useQuery } from 'react-query';
import { useAuth } from '@/context/auth-context';
import { secureFetch } from '@/utils/fetch';
import { useCustomers } from './store';

export default function CustomerIndex() {
  const { push } = useRouter();
  const { user } = useAuth();
  const { setState, customers } = useCustomers();

  // const { isLoading, error } = useQuery({
  //   queryKey: ['test'],
  //   queryFn: async () => await secureFetch('customers', { method: 'GET' }),
  //   onSettled: (data) => setState(data.data),
  //   enabled: !!user,
  // });

  return (
    <PageLayout hasReturnArrow returnFunc={() => push('/dashboard')}>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {customers.length > 0
            ? customers.map((customer: any) => {
                return (
                  <tr key={customer.id}>
                    <td>
                      {customer.first_name} {customer.id}
                    </td>
                    <td>{customer.last_name}</td>
                    <td>{customer.address}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </PageLayout>
  );
}

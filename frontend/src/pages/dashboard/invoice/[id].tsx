import { useRouter } from 'next/router';
import Image from 'next/image';

import { Text, PageLayout } from '@/components';
import arrow from '/public/arrow-down.svg';
import { InvoiceDetails } from '@/components/dashboard';

export const InvoiceInfo = () => {
  const { push } = useRouter();

  return (
    <PageLayout>
      <div className='pt-2'>
        <div className='flex' onClick={() => push('/dashboard')}>
          <Image src={arrow} alt='arrow-down' width={10} height={10} className='rotate-90' />

          <Text t='heading-small' customClasses='ml-5'>
            Go back
          </Text>
        </div>

        <InvoiceDetails />
      </div>
    </PageLayout>
  );
};

export default InvoiceInfo;

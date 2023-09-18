import { Text } from '@/components';
import { InvoiceStatusTypes } from '@/types/invoice_types';

export const Tag = ({ children, t }: { children: React.ReactNode; t: InvoiceStatusTypes }) => {
  const background = {
    pending: 'bg-orange-tag ',
    paid: 'bg-green-tag',
    overdue: 'bg-danger-tag',
    draft: 'bg-gray-tag',
  }[t as InvoiceStatusTypes];

  const txtColor = {
    pending: 'text-[#FF8F00] dark:text-[#FF8F00]',
    paid: 'text-[#33D69F] dark:text-[#33D69F]',
    overdue: 'text-rose-500 dark:text-rose-500',
    draft: 'text-[#373B53] dark:text-secondary_light',
  }[t as InvoiceStatusTypes];

  const dot = {
    pending: 'bg-[#FF8F00] dark:bg-[#FF8F00',
    paid: 'bg-[#33D69F] dark:bg-[#33D69F',
    overdue: 'bg-rose-500 dark:bg-rose-500',
    draft: 'bg-[#373B53] dark:bg-secondary_light',
  }[t as InvoiceStatusTypes];

  return (
    <div className={`p-4 pl-6 pr-6 h-12 w-32 rounded-md flex justify-center items-center ${background}`}>
      <div className={`h-3 w-3 rounded-full ${dot}`}></div>
      <Text t='heading-small' customClasses={`capitalize ml-2 ${txtColor} font-bold`}>
        {children}
      </Text>
    </div>
  );
};

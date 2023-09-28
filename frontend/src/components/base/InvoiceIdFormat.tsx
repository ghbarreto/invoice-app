import { Text } from './';

export const InvoiceIdFormat = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className='flex items-baseline'>
      <Text t='body' customClasses='font-bold text-secondary_dark dark:text-secondary_light_hover'>
        #
      </Text>
      <Text t='body' customClasses='font-bold'>
        {props.children}
      </Text>
    </div>
  );
};

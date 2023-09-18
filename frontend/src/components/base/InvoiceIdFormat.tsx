import { Text } from './';

export const InvoiceIdFormat = (props: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div className='flex items-baseline'>
      <Text t='heading-medium-variant' customClasses='text-md text-secondary_dark dark:text-secondary_light_hover'>
        #
      </Text>
      <Text t='heading-medium-variant' customClasses='text-md'>
        {props.children}
      </Text>
    </div>
  );
};

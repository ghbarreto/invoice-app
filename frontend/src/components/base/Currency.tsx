import { Text } from './';

type CurrencyProps = {
  amount: number;
  currencyCode: string;
};

export const Currency = ({ amount, currencyCode }: CurrencyProps) => {
  const curr = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  const cc = curr.formatToParts(amount).find((part) => part.type === 'currency');

  const value = curr.format(amount).replaceAll(cc?.value ?? '', '');

  return (
    <Text t='heading-small' customClasses='pt-2 tracking-wide font-normal font-monospace'>
      {cc?.value ?? currencyCode}
      <span className='pl-1'>{value}</span>
    </Text>
  );
};

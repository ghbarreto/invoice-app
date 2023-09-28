import { Text } from './';

type CurrencyProps = {
  amount: number;
  currencyCode: string;
  customClasses?: string;
};

export const Currency = ({ amount, currencyCode, customClasses }: CurrencyProps) => {
  const curr = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  });
  const cc = curr.formatToParts(amount).find((part) => part.type === 'currency');

  const value = curr.format(amount).replaceAll(cc?.value ?? '', '');

  return (
    <Text tag='div' t='body' customClasses={`tracking-wide font-normal font-monospace ${customClasses}`}>
      {cc?.value ?? currencyCode}
      <span className='pl-1'>{value}</span>
    </Text>
  );
};

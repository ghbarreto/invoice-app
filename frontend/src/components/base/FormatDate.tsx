import { format } from 'date-fns';

export const FormatDate = ({ d }: { d: string }) => {
  const parseDate = new Date(d);

  return format(parseDate, 'dd MMM yyyy');
};

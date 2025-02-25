import { format } from 'date-fns';

export const formatDate = (currentDate, style: string): string => {
   return format(currentDate, style);
};

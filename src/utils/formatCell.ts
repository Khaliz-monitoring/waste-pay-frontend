import { format } from 'date-fns';

export const formatNumber = (num: any) => {
   if (typeof num === 'number' && num != Infinity && num != -Infinity && !isNaN(num)) {
      num /= 1000;
      return num.toLocaleString(undefined, {
         minimumFractionDigits: 2,
         maximumFractionDigits: 2,
      });
   } else {
      return null;
   }
};
export const formatNumberPercentage = (num: any) => {
   if (typeof num === 'number' && num != Infinity && num != -Infinity && !isNaN(num)) {
      return (
         num.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
         }) + '%'
      );
   } else {
      return null;
   }
};

export const formatDate = (calendar) => {
   if (calendar) {
      var date = new Date(calendar);
      return format(date, 'dd-MM-yyyy');
   }
};

export const formatNumberTwoPercentDigit = (num: number) => {
   return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
   });
};

export const formatDateTime = (dateTime: string) => {
   if (!dateTime) return '';

   var reTime = /(\d+\-\d+\-\d+)\D(\d+\:\d+\:\d+).+/;
   var newTime = dateTime.replace(reTime, '$2  $1');
   return newTime;
};

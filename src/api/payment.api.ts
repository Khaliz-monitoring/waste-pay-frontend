import HttpService from '@/helper/HttpService';
import { AddUserProps } from '@/types/mange-user';

class PaymentApi extends HttpService {
   getPaymentsByUserId = (userId: number) => {
      return this.get<any>(`payments/user/${userId}`);
   };

   handlePayAmount = (data: any) => {
      return this.post<any>('transactions/create-transaction', data);
   };
}

const paymentApi = new PaymentApi('payment');

export default paymentApi;

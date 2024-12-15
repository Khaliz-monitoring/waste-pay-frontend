export type Payment = {
   id: number;
   billMonth: string;
   amount: number;
   isPaid: boolean;
   paymentGateway: string;
   paymentTime: string;
};

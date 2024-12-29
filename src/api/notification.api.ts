import HttpService from '@/helper/HttpService';

class NotificationApi extends HttpService {
   getNotifications = (userId: number) => {
      return this.get<any>(`/trash-payment-notification/user/${userId}`);
   };
}

const notificationApi = new NotificationApi('Notification-api');

export default notificationApi;

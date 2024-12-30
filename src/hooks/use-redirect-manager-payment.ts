import notificationApi from '@/api/notification.api';
import { userNavItems } from '@/components/dashboard/layout/config';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { accountStore, mainbarStore } from '@/store/slices';
import { useRouter } from 'next/navigation';

export const paymentHref = () => {
   return userNavItems.filter((e) => e.key === 'payment')[0].href;
};

export const useRedirectToUserPayment = () => {
   const currentUser = useAppSelector(accountStore.selectUserInfo);
   const router = useRouter();
   const dispatch = useAppDispatch();

   const redirect = (userId: number, notificationId?: number) => {
      if (notificationId) {
         notificationApi.markAsRead(notificationId);
      }
      dispatch(mainbarStore.fetchNotifications());

      if (currentUser.id === userId) {
         router.push(`${paymentHref()}/${userId}`);
      } else {
         window.open(`${paymentHref()}/${userId}`, '_blank');
      }
   };

   return { redirect };
};

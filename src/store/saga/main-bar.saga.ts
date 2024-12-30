import notificationApi from '@/api/notification.api';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { accountStore, mainbarStore } from '../slices';
import { NotificationItem, Notification } from '../slices/main-bar.reducer';

function* fetchNotifications() {
   const { userId } = yield all({
      userId: select(accountStore.selectUserId),
   });

   const { data } = yield call(notificationApi.getNotifications, userId);

   const notifications = mappingNotification(data.result);

   yield put(mainbarStore.actions.setNotifications(notifications));
}

function mappingNotification(recordList: any[]): Notification {
   let list: NotificationItem[] = [];
   let totalUnread = 0;
   recordList.forEach((item) => {
      list.push({
         notificationId: item.id,
         fullName: item.sender?.fullName,
         avatar: item.sender?.avatar,
         role: item.sender?.role,
         isRead: item.read,
         message: item.message,
         time: item.time,
         userId: item.sender ? item.sender?.id : item.recipient?.id,
      });

      // count notify is not read
      if (!item.read) {
         totalUnread++;
      }
   });
   return { list, totalUnread };
}

function* watch_notifications() {
   yield takeLatest(mainbarStore.fetchNotifications, fetchNotifications);
}

export default function* watchManageCustomerSaga() {
   yield all([fork(watch_notifications)]);
}

import paymentApi from '@/api/payment.api';
import { ERole } from '@/enums/role.enum';
import { Payment } from '@/types/payment';
import { TableState } from '@/types/table-state';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { accountStore, paymentStore } from '../slices';
import { mappingUserInfo } from './customer.saga';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetchListUser(payload: PayloadAction<ERole>) {
   const role: ERole = payload.payload;
   const { userInfo } = yield all({
      userInfo: select(accountStore.selectUserInfo),
   });

   const { userId } = yield all({
      userId: select(paymentStore.selectUserId),
   });

   const { data } = yield call(paymentApi.getPaymentsByUserId, userId);

   const { paymentList, user } = mappingData(data.result);

   const tableData = {
      rows: paymentList,
      totalItems: data.totalElements,
   } as unknown as TableState;

   yield put(paymentStore.actions.setTableState(tableData));
   yield put(paymentStore.actions.setUserInfo(user));
}

function mappingData(rawData: any) {
   let payments: Payment[] = [];

   const { paymentList, userInfo } = rawData;

   paymentList.forEach((item) =>
      payments.push({
         id: item.id,
         amount: item.amount,
         billMonth: `Tháng ${item.billingMonth} ${item.billingYear}`,
         paymentGateway: item.paymentGateway,
         paymentTime: item.paymentTime,
         isPaid: item.isPaid,
      })
   );

   const user = mappingUserInfo(userInfo);

   return { user, paymentList: payments };
}

function* handlePay({ payload }: PayloadAction<number>) {
   const { data } = yield call(paymentApi.handlePayAmount, { paymentId: payload });
}

function* watch_firstFetch() {
   yield takeEvery(paymentStore.firstFetchAction, firstFetchListUser);
}

function* watch_payAmount() {
   yield takeEvery(paymentStore.payAction, handlePay);
}

export default function* watchManageCustomerSaga() {
   yield all([fork(watch_firstFetch), fork(watch_payAmount)]);
}

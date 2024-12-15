import paymentApi from '@/api/payment.api';
import { ERole } from '@/enums/role.enum';
import { Payment } from '@/types/payment';
import { TableState } from '@/types/table-state';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { accountStore, paymentStore } from '../slices';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetchListUser(payload: PayloadAction<ERole>) {
   const role: ERole = payload.payload;
   const { userInfo } = yield all({
      userInfo: select(accountStore.selectUserInfo),
   });
   const { data } = yield call(paymentApi.getPaymentsByUserId, userInfo.id);

   const paymentList: Payment[] = mappingTableData(data.result);

   const tableData = {
      rows: paymentList,
      totalItems: data.totalElements,
   } as unknown as TableState;

   yield put(paymentStore.actions.setTableState(tableData));
}

function mappingTableData(recordList: any[]): Payment[] {
   let paymentList: Payment[] = [];
   recordList.forEach((item) =>
      paymentList.push({
         id: item.id,
         amount: item.amount,
         billMonth: `Tháng ${item.billingMonth} ${item.billingYear}`,
         paymentGateway: item.paymentGateway,
         paymentTime: item.paymentTime,
         isPaid: item.isPaid,
      })
   );
   return paymentList;
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

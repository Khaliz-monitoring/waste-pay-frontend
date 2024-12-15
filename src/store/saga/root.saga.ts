import { fork } from 'redux-saga/effects';

import watchManageUserSaga from './customer.saga';
import watchAccount from './account.saga';
import watchPayment from './payment.saga';

function* rootSaga() {
   yield fork(watchManageUserSaga);

   yield fork(watchAccount);
   yield fork(watchPayment);
}

export default rootSaga;

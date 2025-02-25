import { fork } from 'redux-saga/effects';

import watchManageUserSaga from './customer.saga';
import watchAccount from './account.saga';
import watchPayment from './payment.saga';
import watchMainbar from './main-bar.saga';
import watchStatistical from './statistical.saga';

function* rootSaga() {
   yield fork(watchManageUserSaga);
   yield fork(watchAccount);
   yield fork(watchPayment);
   yield fork(watchMainbar);
   yield fork(watchStatistical);
}

export default rootSaga;

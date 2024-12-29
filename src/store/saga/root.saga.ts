import { fork } from 'redux-saga/effects';

import watchManageUserSaga from './customer.saga';
import watchAccount from './account.saga';
import watchPayment from './payment.saga';
import watchMainbar from './main-bar.saga';

function* rootSaga() {
   yield fork(watchManageUserSaga);

   yield fork(watchAccount);
   yield fork(watchPayment);
   yield fork(watchMainbar);
}

export default rootSaga;

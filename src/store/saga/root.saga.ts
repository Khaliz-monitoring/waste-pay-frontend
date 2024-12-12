import { fork } from 'redux-saga/effects';

import watchManageUserSaga from './customer.saga';
import watchAccount from './account.saga';

function* rootSaga() {
   yield fork(watchManageUserSaga);

   yield fork(watchAccount);
}

export default rootSaga;

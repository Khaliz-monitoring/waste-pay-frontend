import { fork } from 'redux-saga/effects';

import watchManageUserSaga from './customer.saga';

function* rootSaga() {
   yield fork(watchManageUserSaga);
}

export default rootSaga;

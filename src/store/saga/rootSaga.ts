import { fork } from 'redux-saga/effects';

import { watchFirstFetch, watchAddUser } from './customer.saga';

function* rootSaga() {
   yield fork(watchFirstFetch);
   yield fork(watchAddUser);
}

export default rootSaga;

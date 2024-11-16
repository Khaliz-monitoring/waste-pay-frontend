import { fork } from 'redux-saga/effects';

import { watchFirstFetch } from './customer.saga';

function* rootSaga() {
   yield fork(watchFirstFetch);
}

export default rootSaga;

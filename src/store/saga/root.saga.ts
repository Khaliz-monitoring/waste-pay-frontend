import { fork } from 'redux-saga/effects';

import watchManageUserSaga from './customer.saga';
import watchAdministrateLevel from './administrative-level.saga';

function* rootSaga() {
   yield fork(watchManageUserSaga);

   yield fork(watchAdministrateLevel);
}

export default rootSaga;

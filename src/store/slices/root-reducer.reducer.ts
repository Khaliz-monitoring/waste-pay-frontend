import { combineReducers } from 'redux';
import common from './common.reducer';
import manageUser from './manage-user.reducer';
import navbar from './navbar.reducer';
import account from './account.reducer';
import administrateLevel from './administrate-level.reducer';
import payment from './payment.reducer';
import mainbar from './main-bar.reducer';

const rootReducers = combineReducers({
   [common.name]: common.reducer,
   [manageUser.name]: manageUser.reducer,
   [navbar.name]: navbar.reducer,
   [account.name]: account.reducer,
   [administrateLevel.name]: administrateLevel.reducer,
   [payment.name]: payment.reducer,
   [mainbar.name]: mainbar.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;

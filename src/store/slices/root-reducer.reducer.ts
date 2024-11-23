import { combineReducers } from 'redux';
import common from './common.reducer';
import manageUser from './manage-user.reducer';
import navbar from './navbar.reducer';

const rootReducers = combineReducers({
   [common.name]: common.reducer,
   [manageUser.name]: manageUser.reducer,
   [navbar.name]: navbar.reducer,
});

export type RootReducerType = ReturnType<typeof rootReducers>;

export default rootReducers;
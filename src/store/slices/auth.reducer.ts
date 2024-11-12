import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

export interface UserInfo {
   name: string;
   phone: string;
   avatar: string;
   address: string;
   role: string;
   accessToken: string;
}

export type UserReduce = {
   currentUser: UserInfo;
};

export const name = 'auth';

const defaultUser: UserInfo = {
   name: null,
   phone: null,
   avatar: null,
   address: null,
   role: null,
   accessToken: null,
};

const initialState: UserReduce = {
   currentUser: defaultUser as UserInfo,
};

export const userSilce = createSlice({
   name,
   initialState,
   reducers: {
      setCurrentUser(state, action: PayloadAction<UserInfo>) {
         state.currentUser = action.payload;
      },
   },
});
export const selectState = (state: RootState) => state[name];

export const selectListUser = createSelector(selectState, (state) => state.userList);

export const actions = userSilce.actions;

export default userSilce;

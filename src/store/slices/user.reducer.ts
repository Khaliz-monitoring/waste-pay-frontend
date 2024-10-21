import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';

export interface UserInfo {
   name: string;
   phone: string;
   avatar: string;
   address: string;
   role: string;
}

export type UserReduce = {
   userList: UserInfo[];
};

export const name = 'user';

const defaultUser: UserInfo = {
   name: null,
   phone: null,
   avatar: null,
   address: null,
   role: null,
};

const initialState: UserReduce = {
   userList: [],
};

export const userSilce = createSlice({
   name,
   initialState,
   reducers: {
      setUserList: (state, action: PayloadAction<UserInfo[]>) => {
         state.userList = action.payload;
      },
   },
});
export const selectState = (state: RootState) => state[name];

export const selectListUser = createSelector(selectState, (state) => state.userList);

export const { setUserList } = userSilce.actions;

export default userSilce;

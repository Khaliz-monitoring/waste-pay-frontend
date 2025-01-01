import { defaultTableState } from '@/default-values/table-state';
import { TableState } from '@/types/table-state';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';
import { UserAuth } from '@/types/auth';
import { defaultUserInfo } from './account.reducer';

export const name = 'payment';

export type PaymentReducer = {
   tableState: TableState;
   userId: number;
   userInfo: UserAuth;
};

const initialState: PaymentReducer = {
   tableState: defaultTableState,
   userId: null,
   userInfo: defaultUserInfo,
};

export const paymentSilce = createSlice({
   name,
   initialState,
   reducers: {
      setTableState: (state, { payload }: PayloadAction<Partial<TableState>>) => {
         state.tableState = {
            ...state.tableState,
            ...payload,
         };
      },

      setUserId: (state, { payload }: PayloadAction<number>) => {
         state.userId = payload;
      },

      setUserInfo: (state, { payload }: PayloadAction<UserAuth>) => {
         state.userInfo = payload;
      },
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];

export const selectDataTable = createSelector(selectState, (state) => state.tableState);

export const selectUserId = createSelector(selectState, (state) => state.userId);

export const selectUserInfo = createSelector(selectState, (state) => state.userInfo);

/* =============== Actions ================ */

export const firstFetchAction = createAction(`${name}/FIRST_FETCH`);

export const payAction = createAction<number>(`${name}/payAction`);

export const actions = paymentSilce.actions;

export default paymentSilce;

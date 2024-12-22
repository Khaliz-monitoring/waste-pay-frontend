import { defaultTableState } from '@/default-values/table-state';
import { TableState } from '@/types/table-state';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';

export const name = 'payment';

export type PaymentReducer = {
   tableState: TableState;
   userId: number;
};

const initialState: PaymentReducer = {
   tableState: defaultTableState,
   userId: null,
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
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];

export const selectDataTable = createSelector(selectState, (state) => state.tableState);

export const selectUserId = createSelector(selectState, (state) => state.userId);

/* =============== Actions ================ */

export const firstFetchAction = createAction(`${name}/FIRST_FETCH`);

export const payAction = createAction<number>(`${name}/payAction`);

export const actions = paymentSilce.actions;

export default paymentSilce;

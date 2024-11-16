import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';
import {
   EntityType,
   ManageUserReducer,
   SetLoadingTableProps,
   SetUserListProps,
   TableState,
   User,
} from '@/types/mange-user';

export const name = 'manage-user';

const defaultTableState: TableState = {
   rows: [],
   pageSize: null,
   pageNo: null,
   loading: false,
};

const initialState: ManageUserReducer = {
   customer: {
      tableState: defaultTableState,
   },
   commune: {
      tableState: defaultTableState,
   },
   district: {
      tableState: defaultTableState,
   },
};

export const userSilce = createSlice({
   name,
   initialState,
   reducers: {
      // set list user for page based on type('customer' | 'commune' | 'district')
      setUserList: (state, { payload }: PayloadAction<SetUserListProps>) => {
         const { entityType, userRecords } = payload;
         state[entityType].tableState.rows = userRecords;
      },

      // set loading state for a specified entity type's table
      setLoadingTableState: (state, { payload }: PayloadAction<SetLoadingTableProps>) => {
         const { entityType, isLoading } = payload;
         state[entityType].tableState.loading = isLoading;
      },
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];

export const selectTableData = (entityType: EntityType) =>
   createSelector(selectState, (state) => state[entityType].tableState);

/* =============== Actions ================ */

export const firstFetch = createAction<EntityType>(`${name}/FIRST_FETCH`);

export const actions = userSilce.actions;

export default userSilce;

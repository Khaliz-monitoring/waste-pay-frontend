import { ERole } from '@/enums/role.enum';
import {
   AddUserProps,
   ManageUserReducer,
   SelectedFilter,
   SetLoadingTableProps,
   SetSelectedFilterProps,
   SetUserListProps,
} from '@/types/mange-user';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';
import { defaultTableState } from '@/default-values/table-state';

export const name = 'manage-user';

const selectedFilter: SelectedFilter = {
   search: null,
};

const initialState: ManageUserReducer = {
   [ERole.USER]: {
      tableState: defaultTableState,
      selectedFilter,
   },
   [ERole.COMMUNE]: {
      tableState: defaultTableState,
      selectedFilter,
   },
   [ERole.DISTRICT]: {
      tableState: defaultTableState,
      selectedFilter,
   },
};

export const userSilce = createSlice({
   name,
   initialState,
   reducers: {
      // set list user for page based on type('customer' | 'commune' | 'district')
      setUserList: (state, { payload }: PayloadAction<SetUserListProps>) => {
         const { role, tableData } = payload;
         state[role].tableState = { ...state[role].tableState, ...tableData };
      },

      // set loading state for a specified entity type's table
      setLoadingTableState: (state, { payload }: PayloadAction<SetLoadingTableProps>) => {
         const { entityType, isLoading } = payload;
         state[entityType].tableState.loading = isLoading;
      },

      setDataFilter: (state, { payload }: PayloadAction<SetSelectedFilterProps>) => {
         const { role, selectedFilter } = payload;
         state[role].selectedFilter = { ...state[role].selectedFilter, ...selectedFilter };
      },
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];

export const selectTableData = (role: ERole) =>
   createSelector(selectState, (state) => {
      return state[role].tableState;
   });

export const selectDataFilterByModelType = (role: ERole) =>
   createSelector(selectState, (state) => {
      const modelType = state[role];

      return {
         pageNo: modelType.tableState.pageNo,
         pageSize: modelType.tableState.pageSize,
         role,
         ...modelType.selectedFilter,
      };
   });

/* =============== Actions ================ */

export const firstFetchAction = createAction<ERole>(`${name}/FIRST_FETCH`);

export const addUserAction = createAction<AddUserProps>(`${name}/ADD_USER`);

export const searchUserAction = createAction<string>(`${name}/searchUserAction`);

export const actions = userSilce.actions;

export default userSilce;

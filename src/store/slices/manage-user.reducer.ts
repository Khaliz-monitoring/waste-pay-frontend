import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../config';
import {
   AddUserProps,
   EntityType,
   ManageUserReducer,
   SelectedFilter,
   SetLoadingTableProps,
   SetUserListProps,
   TableState,
} from '@/types/mange-user';
import { extrackERole } from '@/enums/role.enum';

export const name = 'manage-user';

const defaultTableState: TableState = {
   rows: [],
   pageSize: 10,
   pageNo: 1,
   loading: false,
   totalItems: 0,
};

const selectedFilter: SelectedFilter = {
   search: null,
};

const initialState: ManageUserReducer = {
   user: {
      tableState: defaultTableState,
      selectedFilter,
   },
   commune: {
      tableState: defaultTableState,
      selectedFilter,
   },
   district: {
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
         const { entityType, tableData } = payload;
         state[entityType].tableState = { ...state[entityType].tableState, ...tableData };
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

export const selectDataFilterByModelType = (entityType: EntityType) =>
   createSelector(selectState, (state) => {
      const modelType = state[entityType];

      return {
         pageNo: modelType.tableState.pageNo,
         pageSize: modelType.tableState.pageSize,
         entityType,
         ...modelType.selectedFilter,
      };
   });

/* =============== Actions ================ */

export const firstFetchAction = createAction<EntityType>(`${name}/FIRST_FETCH`);

export const addUserAction = createAction<AddUserProps>(`${name}/ADD_USER`);

export const actions = userSilce.actions;

export default userSilce;

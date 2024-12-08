import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Option } from '@/types';
import { UserAuth } from '@/types/auth';
import { RootState } from '../config';

export const name = 'account';
export const resetState = createAction(`${name}/'RESET_STATE'}`);

export type FilterOptions = {
   address: {
      DISTRICT: Option[];
      PROVINCE: Option[];
      WARD: Option[];
   };
};

interface AccountSilce {
   filterOptions: FilterOptions;
   updatedUserData: UserAuth;
}

export const initialState: AccountSilce = {
   filterOptions: {
      address: {
         DISTRICT: null,
         PROVINCE: null,
         WARD: null,
      },
   },
   updatedUserData: null,
};

const commonSlice = createSlice({
   name,
   initialState,
   reducers: {
      updateFilterOptions(state, { payload }: PayloadAction<Partial<FilterOptions>>) {
         state.filterOptions = {
            ...state.filterOptions,
            ...payload,
         };
      },
   },
});

// Selectors
export const selectState = (state: RootState) => state[name];

export const selectFilterOptions = createSelector(selectState, (state) => state.filterOptions);

export const selectUpdatedUserData = createSelector(selectState, (state) => state.updatedUserData);

export const { actions } = commonSlice;

export default commonSlice;

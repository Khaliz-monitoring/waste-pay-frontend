import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Option } from '@/types';
import { RootState } from '../config';
import {
   ChangeAddressPayload,
   FetchAdministrativeLevelActionPayload,
} from '@/types/administrativeLevel';

export const name = 'administrate-level';
export const resetState = createAction(`${name}/'RESET_STATE'}`);

export type FilterOptions = {
   DISTRICT: Option[];
   PROVINCE: Option[];
   WARD: Option[];
};

export type SelectedFilter = {
   DISTRICT: string;
   PROVINCE: string;
   WARD: string;
};

interface AdministrateLevelSlice {
   filterOptions: FilterOptions;
   selectedFilter: SelectedFilter;
}

export const initialState: AdministrateLevelSlice = {
   filterOptions: {
      DISTRICT: null,
      PROVINCE: null,
      WARD: null,
   },
   selectedFilter: {
      DISTRICT: null,
      PROVINCE: null,
      WARD: null,
   },
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

      updateSelectedFilter(state, { payload }: PayloadAction<Partial<SelectedFilter>>) {
         if (payload.PROVINCE) {
            // clear district and ward data
            state.filterOptions.DISTRICT = [];
            state.selectedFilter.DISTRICT = null;

            state.filterOptions.WARD = [];
            state.selectedFilter.WARD = null;
         }

         if (payload.DISTRICT) {
            // clear  ward data
            state.filterOptions.WARD = null;
            state.selectedFilter.WARD = null;
         }

         state.selectedFilter = {
            ...state.selectedFilter,
            ...payload,
         };
      },
   },
});

// actions

export const fetchAdministrateLevel = createAction<FetchAdministrativeLevelActionPayload>(
   `${name}/fetchAdministrateLevel`
);

export const updateSelectedFilter = createAction<ChangeAddressPayload>(
   `${name}/updateValueSelectedFilter`
);

// Selectors
export const selectState = (state: RootState) => state[name];

export const selectFilterOptions = createSelector(selectState, (state) => state.filterOptions);

export const selectSelectedFilter = createSelector(selectState, (state) => state.selectedFilter);

export const { actions } = commonSlice;

export default commonSlice;

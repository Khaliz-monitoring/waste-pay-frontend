import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Option } from '@/types';
import { Address, UserAuth } from '@/types/auth';
import { RootState } from '../config';
import { ChangeAddressPayload } from '@/types/administrativeLevel';

export const name = 'account';
export const resetState = createAction(`${name}/'RESET_STATE'}`);

export type FilterOptions = {
   address: {
      DISTRICT: Option[];
      PROVINCE: Option[];
      WARD: Option[];
   };
};

export type AddressSelectedFilterItem = {
   fullName?: string;
   code: string;
};

export type AddressSelectedFilter = {
   DISTRICT: AddressSelectedFilterItem;
   PROVINCE: AddressSelectedFilterItem;
   WARD: AddressSelectedFilterItem;
};

interface AccountSilce {
   filterOptions: FilterOptions;
   userInfo: UserAuth;
}

export const initialState: AccountSilce = {
   filterOptions: {
      address: {
         DISTRICT: [],
         PROVINCE: [],
         WARD: [],
      },
   },
   userInfo: null,
};

export const defaultAddress: Address = {
   fullName: null,
   ward: {
      code: null,
      fullName: null,
      district: {
         code: null,
         fullName: null,
         province: {
            code: null,
            fullName: null,
         },
      },
   },
};

const commonSlice = createSlice({
   name,
   initialState,
   reducers: {
      setAddressFilterOptions(state, { payload }: PayloadAction<Partial<Address>>) {
         state.filterOptions.address = {
            ...state.filterOptions.address,
            ...payload,
         };
      },

      /**
       * init user info
       */
      initUserInfo(state, { payload }: PayloadAction<UserAuth>) {
         if (!payload.address) {
            payload = {
               ...payload,
               address: defaultAddress,
            };
         }

         state.userInfo = payload;
      },

      setAdministrativeLevel(state, { payload }: PayloadAction<Partial<AddressSelectedFilter>>) {
         console.log('payload update adminis', payload);
         if (payload.PROVINCE) {
            // clear district data
            state.userInfo.address.ward.district.code = null;
            state.userInfo.address.ward.district.fullName = null;
            state.filterOptions.address.DISTRICT = [];

            // clear ward
            state.userInfo.address.ward.code = null;
            state.userInfo.address.ward.fullName = null;
            state.filterOptions.address.WARD = [];

            // clear specific address
            state.userInfo.address.fullName = null;

            // update new administrative
            state.userInfo.address.ward.district.province = {
               ...state.userInfo.address.ward.district.province,
               ...payload.PROVINCE,
            };
         } else if (payload.DISTRICT) {
            // clear ward
            state.userInfo.address.ward.code = null;
            state.userInfo.address.ward.fullName = null;
            state.filterOptions.address.WARD = [];

            // clear specific address
            state.userInfo.address.fullName = null;

            // update new administrative
            state.userInfo.address.ward.district = {
               ...state.userInfo.address.ward.district,
               ...payload.DISTRICT,
            };
         } else if (payload.WARD) {
            // clear specific address
            state.userInfo.address.fullName = null;

            // update new administrative
            state.userInfo.address.ward = {
               ...state.userInfo.address.ward,
               ...payload.WARD,
            };
         }
      },
   },
});

// actions
export const changeAddressActions = createAction<ChangeAddressPayload>(
   `${name}/changeAddressActions`
);

export const firstFetchAdministrateLevel = createAction(`${name}/firstFetchAdministrateLevel`);

// Selectors
export const selectState = (state: RootState) => state[name];

export const selectFilterOptions = createSelector(selectState, (state) => state.filterOptions);

export const selectUserInfo = createSelector(selectState, (state) => state.userInfo);

export const selectAddress = createSelector(
   selectState,
   (state): Address => state.userInfo.address
);

export const { actions } = commonSlice;

export default commonSlice;

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
   SPECCIFICAL_ADDRESS: AddressSelectedFilterItem;
};

interface AccountSilce {
   filterOptions: FilterOptions;
   userInfo: UserAuth;
}

export const defaultAddress: Address = {
   fullName: null,
   code: null,
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

export const defaultUserInfo: UserAuth = {
   id: null,
   fullName: null,
   role: null,
   phoneNumber: null,
   email: null,
   password: null,
   avatar: null,
   address: defaultAddress,
   state: null,
};

export const initialState: AccountSilce = {
   filterOptions: {
      address: {
         DISTRICT: [],
         PROVINCE: [],
         WARD: [],
      },
   },
   userInfo: defaultUserInfo,
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
         console.log('reducer', payload);

         payload = {
            ...payload,
            address: payload.address || defaultAddress,
            state: null,
         };

         state.userInfo = payload;
      },

      setAdministrativeLevel(state, { payload }: PayloadAction<Partial<AddressSelectedFilter>>) {
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
         } else {
            //SPECCIFICAL_ADDRESS
            console.log('payload update adminis', payload.SPECCIFICAL_ADDRESS.fullName, payload);

            state.userInfo.address.fullName = payload.SPECCIFICAL_ADDRESS.fullName;
         }
      },

      setUserInfo(state, { payload }: PayloadAction<UserAuth>) {
         state.userInfo = { ...state.userInfo, ...payload };
      },
   },
});

// actions
export const changeAddressActions = createAction<ChangeAddressPayload>(
   `${name}/changeAddressActions`
);

export const firstFetchAdministrateLevel = createAction(`${name}/firstFetchAdministrateLevel`);

export const submitUpdateUserInfo = createAction(`${name}/submitUpdateUserInfo`);

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

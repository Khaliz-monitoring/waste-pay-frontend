import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Option } from '@/types';
import { Address, UserAuth } from '@/types/auth';
import { RootState } from '../config';
import { ChangeAddressPayload } from '@/types/administrativeLevel';
import { EUserState } from '@/enums/user-state.enum';

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
   updatedUserInfo: UserAuth;
   userInfo: UserAuth;
   openUpdateUserInfoDialog: boolean;
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
   updatedUserInfo: defaultUserInfo,
   openUpdateUserInfoDialog: false,
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

      setUserInfo(state, { payload }: PayloadAction<UserAuth>) {
         state.updatedUserInfo = payload;
      },

      /**
       * init updated user info
       */
      initUpdatedUserInfo(state, { payload }: PayloadAction<UserAuth>) {
         if (payload.state === EUserState.INACTIVE) {
            state.openUpdateUserInfoDialog = true;
         }

         payload = {
            ...payload,
            address: payload.address || defaultAddress,
            state: null,
         };

         state.updatedUserInfo = payload;
      },

      setAdministrativeLevel(state, { payload }: PayloadAction<Partial<AddressSelectedFilter>>) {
         if (payload.PROVINCE) {
            // clear district data
            state.updatedUserInfo.address.ward.district.code = null;
            state.updatedUserInfo.address.ward.district.fullName = null;
            state.filterOptions.address.DISTRICT = [];

            // clear ward
            state.updatedUserInfo.address.ward.code = null;
            state.updatedUserInfo.address.ward.fullName = null;
            state.filterOptions.address.WARD = [];

            // clear specific address
            state.updatedUserInfo.address.fullName = null;

            // update new administrative
            state.updatedUserInfo.address.ward.district.province = {
               ...state.updatedUserInfo.address.ward.district.province,
               ...payload.PROVINCE,
            };
         } else if (payload.DISTRICT) {
            // clear ward
            state.updatedUserInfo.address.ward.code = null;
            state.updatedUserInfo.address.ward.fullName = null;
            state.filterOptions.address.WARD = [];

            // clear specific address
            state.updatedUserInfo.address.fullName = null;

            // update new administrative
            state.updatedUserInfo.address.ward.district = {
               ...state.updatedUserInfo.address.ward.district,
               ...payload.DISTRICT,
            };
         } else if (payload.WARD) {
            // clear specific address
            state.updatedUserInfo.address.fullName = null;

            // update new administrative
            state.updatedUserInfo.address.ward = {
               ...state.updatedUserInfo.address.ward,
               ...payload.WARD,
            };
         } else {
            //SPECCIFICAL_ADDRESS

            state.updatedUserInfo.address.fullName = payload.SPECCIFICAL_ADDRESS.fullName;
         }
      },

      setUpdatedUserInfo(state, { payload }: PayloadAction<UserAuth>) {
         state.updatedUserInfo = { ...state.updatedUserInfo, ...payload };
      },

      setOpenUpdateUserDialog(state, { payload }: PayloadAction<boolean>) {
         state.openUpdateUserInfoDialog = payload;
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

export const selectUserInfo = createSelector(selectState, (state) => state.updatedUserInfo);

export const selectAddress = createSelector(
   selectState,
   (state): Address => state.updatedUserInfo.address
);

export const selectOpenUpdateUserInfoDialog = createSelector(
   selectState,
   (state) => state.openUpdateUserInfoDialog
);

export const { actions } = commonSlice;

export default commonSlice;
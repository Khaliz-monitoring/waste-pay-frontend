import { EWorkspace, extrackWorkspace } from '@/enums/workspace.enum';
import { AddUserProps, EntityType } from '@/types/mange-user';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';
import { mangerNavItems, userNavItems } from '@/components/dashboard/layout/config';
import { NavItemConfig } from '@/types/nav';
import { accountStore } from '.';
import { ERole } from '@/enums/role.enum';

export const name = 'navbar';

export type NavbarStore = {
   workspace: EWorkspace;
   workspaceOptions: EWorkspace[];
};

const initialState: NavbarStore = {
   workspace: EWorkspace.User,
   workspaceOptions: Object.values(EWorkspace).filter(
      (value) => typeof value === 'string'
   ) as EWorkspace[],
};

export const userSilce = createSlice({
   name,
   initialState,
   reducers: {
      setWorkspace: (state, { payload }: PayloadAction<EWorkspace>) => {
         state.workspace = payload;
      },
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];
export const selectAccountStore = (state: RootState) => state[accountStore.name];

export const selectCurrentWorkspace = createSelector(
   selectState,
   (state): EWorkspace => state.workspace
);

export const selectWorkspaceOptions = createSelector(
   selectState,
   (state) => state.workspaceOptions
);

export const selectNavbarMenuItems = createSelector(
   selectState,
   selectAccountStore,
   (state, accountStore): NavItemConfig[] =>
      accountStore.userInfo.role === ERole.USER ? userNavItems : mangerNavItems
);

/* =============== Actions ================ */

export const firstFetchAction = createAction<EntityType>(`${name}/FIRST_FETCH`);
export const addUserAction = createAction<AddUserProps>(`${name}/ADD_USER`);

export const actions = userSilce.actions;

export default userSilce;

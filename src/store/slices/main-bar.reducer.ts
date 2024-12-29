import { ERole } from '@/enums/role.enum';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';

export const name = 'main-bar';

export type MainBarStore = {
   notification: Notification;
};

export type Notification = {
   totalUnread: number;
   list: NotificationItem[];
};

export type NotificationItem = {
   fullName: string;
   role: ERole;
   message: string;
   isRead: boolean;
   avatar: string;
   time: string;
};

const notifications: Notification = {
   list: [],
   totalUnread: 0,
};

const initialState: MainBarStore = {
   notification: notifications,
};

export const mainbarSlice = createSlice({
   name,
   initialState,
   reducers: {
      setNotifications: (state, { payload }: PayloadAction<Notification>) => {
         state.notification = payload;
      },
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];

export const selectNotifications = createSelector(
   selectState,
   (state): Notification => state.notification
);

/* =============== Actions ================ */

export const fetchNotifications = createAction(`${name}/FETCH_NOTIFICATIONS`);

export const actions = mainbarSlice.actions;

export default mainbarSlice;

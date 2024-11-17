import { call, put, takeEvery } from 'redux-saga/effects';
import { manageUserStore } from '../slices';
import { PayloadAction } from '@reduxjs/toolkit';
import { AddUserProps, EntityType } from '@/types/mange-user';
import manageUserApi from '@/api/manage-user.api';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetchListUser(payload: PayloadAction<EntityType>) {
   const entityType: EntityType = payload.payload;
   const { data } = yield call(manageUserApi.getListUserByFilter, { entityType });

   yield put(manageUserStore.actions.setUserList({ entityType, userRecords: data }));
}

function* addUserIntoList({ payload }: PayloadAction<AddUserProps>) {
   try {
      const response = yield call(manageUserApi.addUser, payload);
   } catch (error) {
      console.log(error);
   }
}

function* watchFirstFetch() {
   yield takeEvery(manageUserStore.firstFetchAction, firstFetchListUser);
}

function* watchAddUser() {
   yield takeEvery(manageUserStore.addUserAction, addUserIntoList);
}

export { watchFirstFetch, watchAddUser };

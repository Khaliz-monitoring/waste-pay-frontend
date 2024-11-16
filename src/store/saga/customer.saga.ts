import { call, put, takeEvery } from 'redux-saga/effects';
import { manageUserStore } from '../slices';
import { PayloadAction } from '@reduxjs/toolkit';
import { EntityType } from '@/types/mange-user';
import manageUserApi from '@/api/manage-user.api';

function* firstFetchListUser(payload: PayloadAction<EntityType>) {
   const entityType: EntityType = payload.payload;
   const { data } = yield call(manageUserApi.getListUserByFilter, { entityType });

   yield put(manageUserStore.actions.setUserList({ entityType, userRecords: data }));
}

function* watchFirstFetch() {
   yield takeEvery(manageUserStore.firstFetch, firstFetchListUser);
}

export { watchFirstFetch };

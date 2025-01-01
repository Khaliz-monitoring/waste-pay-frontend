import manageUserApi from '@/api/manage-user.api';
import { ERole } from '@/enums/role.enum';
import { extractEUserState } from '@/enums/user-state.enum';
import { UserAuth } from '@/types/auth';
import { AddUserProps } from '@/types/mange-user';
import { TableState } from '@/types/table-state';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { commonStore, manageUserStore } from '../slices';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetchListUser(payload: PayloadAction<ERole>) {
   const role: ERole = payload.payload;
   yield call(fetchListUser, role);
}

function* fetchListUser(role: ERole) {
   const { selectedFilter } = yield all({
      selectedFilter: select(manageUserStore.selectDataFilterByModelType(role)),
   });
   const { data } = yield call(manageUserApi.getListUserByFilter, selectedFilter);

   const userList: UserAuth[] = mappingTableData(data.content);

   const tableData = {
      rows: userList,
      totalItems: data.totalElements,
   } as TableState;

   yield put(manageUserStore.actions.setUserList({ role, tableData }));
}

function mappingTableData(recordList: any[]): UserAuth[] {
   let userList: UserAuth[] = [];
   recordList.forEach((item) => userList.push(mappingUserInfo(item)));
   return userList;
}

export function mappingUserInfo(rawData: any): UserAuth {
   return {
      id: rawData.id,
      firstName: rawData.firstname,
      lastName: rawData.lastname,
      fullName: rawData.fullName,
      phoneNumber: rawData.phoneNumber,
      avatar: rawData.avatar,
      address: rawData?.address,
      role: rawData.role,
      email: rawData.email,
      state: extractEUserState(rawData.state.name),
      amountPayable: rawData.amountPayable,
   };
}

function* addUserIntoList({ payload }: PayloadAction<AddUserProps>) {
   try {
      const { data } = yield call(manageUserApi.addUser, payload);
      yield put(commonStore.actions.setSuccessMessage(data.message));

      // refresh data table
      const { role } = payload;
      const tableData = { pageNo: 1 } as TableState;
      yield put(manageUserStore.actions.setUserList({ role, tableData }));

      yield call(fetchListUser, role);
   } catch (error) {
      console.log(error);
      yield put(commonStore.actions.setErrorMessage(error.message));
   }
}

function* watchFirstFetch() {
   yield takeLatest(manageUserStore.firstFetchAction, firstFetchListUser);
}

function* watchAddUser() {
   yield takeEvery(manageUserStore.addUserAction, addUserIntoList);
}

export default function* watchManageCustomerSaga() {
   yield all([fork(watchFirstFetch), fork(watchAddUser)]);
}

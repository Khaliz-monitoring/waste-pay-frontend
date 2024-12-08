import manageUserApi from '@/api/manage-user.api';
import { ERole } from '@/enums/role.enum';
import { extractEUserState as extractEUserState } from '@/enums/user-state.enum';
import { Address, UserAuth } from '@/types/auth';
import { AddUserProps, TableState } from '@/types/mange-user';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { commonStore, manageUserStore } from '../slices';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetchListUser(payload: PayloadAction<ERole>) {
   const role: ERole = payload.payload;
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
   recordList.forEach((item) =>
      userList.push({
         id: item.id,
         firstName: item.firstname,
         lastName: item.lastname,
         fullName: `${item.firstname} ${item.lastname}`,
         phone: item.phoneNumber,
         avatar: item.avatar,
         address: item?.address,
         role: item.role,
         email: item.email,
         state: extractEUserState(item.state.name),
      })
   );
   return userList;
}

function* addUserIntoList({ payload }: PayloadAction<AddUserProps>) {
   try {
      const { data } = yield call(manageUserApi.addUser, payload);
      yield put(commonStore.actions.setSuccessMessage(data.message));
   } catch (error) {
      console.log(error);
      yield put(commonStore.actions.setErrorMessage(error.message));
   }
}

function* watchFirstFetch() {
   yield takeEvery(manageUserStore.firstFetchAction, firstFetchListUser);
}

function* watchAddUser() {
   yield takeEvery(manageUserStore.addUserAction, addUserIntoList);
}

export default function* watchManageCustomerSaga() {
   yield all([fork(watchFirstFetch), fork(watchAddUser)]);
}

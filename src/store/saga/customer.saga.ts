import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { manageUserStore } from '../slices';
import { PayloadAction } from '@reduxjs/toolkit';
import { AddUserProps, EntityType, TableState } from '@/types/mange-user';
import manageUserApi from '@/api/manage-user.api';
import { UserAuth } from '@/types/auth';
import { ERole } from '@/enums/role.enum';

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
         address: extractAddress(item?.address),
         role: item.role,
         email: item.email,
      })
   );
   return userList;
}

function extractAddress(address: any): string {
   if (address)
      return `${address?.houseStreet}, ${address?.ward}, ${address?.district}, ${address?.city}`;
   return null;
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

export default function* watchManageCustomerSaga() {
   yield all([fork(watchFirstFetch), fork(watchAddUser)]);
}

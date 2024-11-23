import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { manageUserStore } from '../slices';
import { PayloadAction } from '@reduxjs/toolkit';
import { AddUserProps, EntityType, TableState } from '@/types/mange-user';
import manageUserApi from '@/api/manage-user.api';
import { UserAuth } from '@/types/auth';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetchListUser(payload: PayloadAction<EntityType>) {
   const entityType: EntityType = payload.payload;
   const { selectedFilter } = yield all({
      selectedFilter: select(manageUserStore.selectDataFilterByModelType(entityType)),
   });
   const { data } = yield call(manageUserApi.getListUserByFilter, selectedFilter);

   const userList: UserAuth[] = mappingTableData(data.content);

   const tableData = {
      rows: userList,
      totalItems: data.totalElements,
   } as TableState;

   yield put(manageUserStore.actions.setUserList({ entityType, tableData }));
}

function mappingTableData(recordList: any[]): UserAuth[] {
   let userList: UserAuth[] = [];
   recordList.forEach((item) =>
      userList.push({
         id: item.id,
         firstName: item.firstname,
         lastName: item.lastname,
         fullName: `${item.firstname} ${item.lastname}`,
         phone: item.phone,
         avatar: item.avatar,
         address: `${item?.address?.houseStreet}, ${item?.address?.ward}, ${item?.address?.district}, ${item?.address?.city}`,
         role: item.role,
         email: item.email,
      })
   );
   return userList;
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

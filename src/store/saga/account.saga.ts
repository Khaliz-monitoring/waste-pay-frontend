import accountApi from '@/api/account.api';
import administrativeLevelApi from '@/api/address.api';
import { EAdministrativeLevel } from '@/enums/administrativeLevel.enum';
import { extrackERole } from '@/enums/role.enum';
import { extractEUserState } from '@/enums/user-state.enum';
import { ChangeAddressPayload } from '@/types/administrativeLevel';
import { UserAuth } from '@/types/auth';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { accountStore, commonStore } from '../slices';

function* fistFetchAdministrativeLevelData() {
   try {
      const { data } = yield call(administrativeLevelApi.firstFetchFetchHierarchy);

      yield put(accountStore.actions.setAddressFilterOptions(data));
   } catch (error) {
      console.log(error);
   }
}

function* changeAdministrativeLevel({ payload }: PayloadAction<ChangeAddressPayload>) {
   try {
      const { field, option } = payload;

      let administrateLevel: EAdministrativeLevel;

      if (field === EAdministrativeLevel.PROVINCE) {
         administrateLevel = EAdministrativeLevel.DISTRICT;
      } else if (field === EAdministrativeLevel.DISTRICT) {
         administrateLevel = EAdministrativeLevel.WARD;
      }

      yield put(accountStore.actions.setAdministrativeLevel({ [field]: option }));

      if (administrateLevel) {
         const { data } = yield call(administrativeLevelApi.fetchHierarchyByLevel, {
            administrativeLevel: administrateLevel,
            parentCode: option.code,
         });

         yield put(accountStore.actions.setAddressFilterOptions(data));
      }
   } catch (error) {
      console.log(error);
   }
}

function* submitUpdateUserInfo() {
   try {
      const { updatedUserInfo } = yield all({
         updatedUserInfo: select(accountStore.selectUpdatedUserInfo),
      });
      const { data } = yield call(accountApi.updateUserInfo, updatedUserInfo);

      const user = {
         firstName: data.firstname,
         lastName: data.lastname,
         fullName: data.fullName,
         phoneNumber: data.phoneNumber,
         avatar: data.avatar,
         address: data.address,
         role: extrackERole(data.role),
         email: data.email,
         state: extractEUserState(data.state.name),
         id: data.id,
      } as UserAuth;

      yield put(accountStore.actions.setUserInfo(user));

      yield put(accountStore.actions.setOpenUpdateUserDialog(false));

      yield put(commonStore.actions.setSuccessMessage('Cập nhập thông tin thành công'));
   } catch (error) {
      console.log(error);
   }
}

function* watch_firstFetchAdministrativeLevelData() {
   yield takeEvery(accountStore.firstFetchAdministrateLevel, fistFetchAdministrativeLevelData);
}

function* watch_submitUpdateUserInfo() {
   yield takeEvery(accountStore.submitUpdateUserInfo, submitUpdateUserInfo);
}

function* watch_changeAdministrativeLevel() {
   yield takeEvery(accountStore.changeAddressActions, changeAdministrativeLevel);
}

export default function* watchManageCustomerSaga() {
   yield all([
      fork(watch_firstFetchAdministrativeLevelData),
      fork(watch_changeAdministrativeLevel),
      fork(watch_submitUpdateUserInfo),
   ]);
}

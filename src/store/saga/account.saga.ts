import administrativeLevelApi from '@/api/address.api';
import { EAdministrativeLevel } from '@/enums/administrativeLevel.enum';
import { ChangeAddressPayload } from '@/types/administrativeLevel';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { accountStore } from '../slices';
import accountApi from '@/api/account.api';

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
      const { userInfo } = yield all({ userInfo: select(accountStore.selectUserInfo) });
      const { data } = yield call(accountApi.updateUserInfo, userInfo);

      console.log(data);
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

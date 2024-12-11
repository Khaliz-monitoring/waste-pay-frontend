import administrativeLevelApi from '@/api/address.api';
import {
   ChangeSelectedFilterPayload,
   FetchAdministrativeLevelActionPayload,
} from '@/types/administrativeLevel';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { administrativeLevelStore } from '../slices';
import { EAdministrativeLevel } from '@/enums/administrativeLevel.enum';

function* fetchAdministrativeLevelData({
   payload,
}: PayloadAction<FetchAdministrativeLevelActionPayload>) {
   try {
      const { administrativeLevel } = payload;
      const res = yield call(administrativeLevelApi.fetchHierarchyByLevel, payload);
      //const convertingData = res.data.PROVINCE.map((value) => ({ value }));
      yield put(
         administrativeLevelStore.actions.updateFilterOptions({
            [administrativeLevel]: res.data.PROVINCE,
         })
      );
   } catch (error) {
      console.log(error);
   }
}

function* changeSelectedFilter({ payload }: PayloadAction<ChangeSelectedFilterPayload>) {
   try {
      const { field, option } = payload;

      let administrateLevel: EAdministrativeLevel;
      if (field === EAdministrativeLevel.PROVINCE) {
         administrateLevel = EAdministrativeLevel.DISTRICT;
      } else if (field === EAdministrativeLevel.DISTRICT) {
         administrateLevel = EAdministrativeLevel.WARD;
      }

      yield put(administrativeLevelStore.actions.updateSelectedFilter({ [field]: option.name }));

      if (administrateLevel) {
         const { data } = yield call(administrativeLevelApi.fetchHierarchyByLevel, {
            administrativeLevel: administrateLevel,
            parentCode: option.code,
         });

         yield put(administrativeLevelStore.actions.updateFilterOptions(data));
      }
   } catch (error) {
      console.log(error);
   }
}

function* watch_fetchAdministrativeLevelData() {
   yield takeEvery(administrativeLevelStore.fetchAdministrateLevel, fetchAdministrativeLevelData);
}

function* watch_changeSelectedFilter() {
   yield takeEvery(administrativeLevelStore.updateSelectedFilter, changeSelectedFilter);
}

export default function* watchManageCustomerSaga() {
   yield all([fork(watch_fetchAdministrativeLevelData), fork(watch_changeSelectedFilter)]);
}

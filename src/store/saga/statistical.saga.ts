import statisticalApi from '@/api/statistical.api';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { statisticalStore } from '../slices';
import i18next from '@/i18n/locales/config';
import { formatDate } from '@/utils/format-date';
import { defaultChartData } from '../slices/statistical.reducer';

// this function will be call when the first going to manage commune, district, customer pages
function* firstFetch() {
   yield call(fetchChartData);

   yield call(fetchSummaryData);
}

function* fetchSummaryData() {
   const { data } = yield call(statisticalApi.retrieveSummaryData);

   yield put(statisticalStore.actions.setSummaryData(data));
}

function* fetchChartData() {
   yield put(statisticalStore.actions.setChart(defaultChartData));
   const { selectedFilter } = yield all({
      selectedFilter: select(statisticalStore.selectSelectedFilter),
   });
   const { data } = yield call(statisticalApi.retrieveChartData, selectedFilter.chart);
   mappingChartValue(data.data);
   data.xaxis = formatXAxisChart(data.xaxis);

   yield put(statisticalStore.actions.setChart(data));
}

const formatXAxisChart = (xAxis: any[]) => {
   return xAxis.map((dateStr) => formatDate(new Date(dateStr), 'MM - yyyy'));
};

const mappingChartValue = (data: any[]) => {
   data.forEach((column) => {
      column.group = 'apexcharts-axis-0';
      column.name = i18next.t(`label.${column.name}`);
   });
};

function* watchFirstFetch() {
   yield takeLatest(statisticalStore.firstFetchAction, firstFetch);
}

function* watchFetchChartData() {
   yield takeLatest(statisticalStore.fetchChartDataAction, fetchChartData);
}

export default function* watchStatisticalSaga() {
   yield all([fork(watchFirstFetch), fork(watchFetchChartData)]);
}

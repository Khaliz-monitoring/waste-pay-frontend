import { ERole } from '@/enums/role.enum';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../config';

export const name = 'statistial';

interface SelectedFilter {
   chart: {
      year: number;
   };
}

export type StatisticalStore = {
   chart: any;
   summaryData: any;
   selectedFilter: SelectedFilter;
};
export const defaultChartData = {
   data: [
      {
         name: 'totalUsers',
         data: [],
         group: 'apexcharts-axis-0',
      },
      { name: 'paidUsers', data: [], group: 'apexcharts-axis-0' },
   ],
   xaxis: [],
};
const initialState: StatisticalStore = {
   chart: defaultChartData,

   summaryData: {
      totalPaidAmount: 0,
      totalUnPaidAmount: 0,
      totalUsers: 0,
   },
   selectedFilter: {
      chart: {
         year: 2024,
      },
   },
};

export const statisticalSlice = createSlice({
   name,
   initialState,
   reducers: {
      setChart: (state, { payload }: PayloadAction<any>) => {
         state.chart = payload;
      },

      setSummaryData: (state, { payload }: PayloadAction<any>) => {
         state.summaryData = payload;
      },
   },
});

/* =============== Selectors ================ */

export const selectState = (state: RootState) => state[name];

export const selectChart = createSelector(selectState, (state) => state.chart);
export const selectSummaryData = createSelector(selectState, (state) => state.summaryData);

export const selectSelectedFilter = createSelector(
   selectState,
   (state): SelectedFilter => state.selectedFilter
);

/* =============== Actions ================ */

export const firstFetchAction = createAction(`${name}/FIRST_FETCH`);

export const fetchChartDataAction = createAction(`${name}/FETCH_CHART_DATA`);

export const fetchColumnChartData = createAction(`${name}/FETCH_COLUMN_CHART_DATA`);

export const actions = statisticalSlice.actions;

export default statisticalSlice;

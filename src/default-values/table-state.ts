import { TableState } from '@/types/table-state';

export const defaultTableState: TableState = {
   rows: [],
   pageSize: 10,
   pageNo: 1,
   loading: false,
   totalItems: 0,
};

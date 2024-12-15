import { UserAuth } from './auth';

/**
 * table state
 */
export type TableState = {
   rows: UserAuth[];
   pageSize: number;
   pageNo: number;
   loading: boolean;
   totalItems: number;
};

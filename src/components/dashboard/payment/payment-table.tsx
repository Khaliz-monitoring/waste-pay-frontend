'use client';

import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { useAppDispatch } from '@/store/hooks';
import { Payment } from '@/types/payment';
import { centerColumn, formatNumbericColumn } from '@/utils/columnProperties';
import { Button, Grid } from '@mui/material';
import React from 'react';

const payments = [
   {
      billMonth: 'Tháng 1 2023',
      amount: 35000,
      billMethod: 'VN Pay',
      paymentTime: '10:15 15-01-2023',
   },
   {
      billMonth: 'Tháng 2 2023',
      amount: 40000,
      billMethod: 'Momo',
      paymentTime: null,
   },
   {
      billMonth: 'Tháng 3 2023',
      amount: 42000,
      billMethod: 'Zalo Pay',
      paymentTime: '08:10 05-03-2023',
   },
   {
      billMonth: 'Tháng 4 2023',
      amount: 46000,
      billMethod: 'Thẻ tín dụng',
      paymentTime: '18:30 10-04-2023',
   },
   {
      billMonth: 'Tháng 5 2023',
      amount: 39000,
      billMethod: 'Chuyển khoản ngân hàng',
      paymentTime: null,
   },
   {
      billMonth: 'Tháng 6 2023',
      amount: 37000,
      billMethod: 'VN Pay',
      paymentTime: '16:00 11-06-2023',
   },
   {
      billMonth: 'Tháng 7 2023',
      amount: 41000,
      billMethod: 'Momo',
      paymentTime: '09:25 03-07-2023',
   },
   {
      billMonth: 'Tháng 8 2023',
      amount: 43000,
      billMethod: 'Tiền mặt',
      paymentTime: '11:45 12-08-2023',
   },
   {
      billMonth: 'Tháng 9 2023',
      amount: 48000,
      billMethod: 'Chuyển khoản ngân hàng',
      paymentTime: '17:30 27-09-2023',
   },
   {
      billMonth: 'Tháng 10 2023',
      amount: 50000,
      billMethod: 'Zalo Pay',
      paymentTime: '14:40 05-10-2023',
   },
   {
      billMonth: 'Tháng 11 2023',
      amount: 49000,
      billMethod: 'Thẻ tín dụng',
      paymentTime: '13:30 15-11-2023',
   },
   {
      billMonth: 'Tháng 12 2023',
      amount: 52000,
      billMethod: 'Chuyển khoản ngân hàng',
      paymentTime: '09:00 20-12-2023',
   },
   {
      billMonth: 'Tháng 1 2024',
      amount: 55000,
      billMethod: 'Tiền mặt',
      paymentTime: '11:50 01-01-2024',
   },
   {
      billMonth: 'Tháng 2 2024',
      amount: 57000,
      billMethod: 'VN Pay',
      paymentTime: '10:30 18-02-2024',
   },
   {
      billMonth: 'Tháng 3 2024',
      amount: 58000,
      billMethod: 'Momo',
      paymentTime: '14:25 07-03-2024',
   },
   {
      billMonth: 'Tháng 4 2024',
      amount: 59000,
      billMethod: 'Zalo Pay',
      paymentTime: '16:10 21-04-2024',
   },
   {
      billMonth: 'Tháng 5 2024',
      amount: 60000,
      billMethod: 'Chuyển khoản ngân hàng',
      paymentTime: '15:45 02-05-2024',
   },
   {
      billMonth: 'Tháng 6 2024',
      amount: 61000,
      billMethod: 'Thẻ tín dụng',
      paymentTime: '18:35 10-06-2024',
   },
   {
      billMonth: 'Tháng 7 2024',
      amount: 62000,
      billMethod: 'Chuyển khoản ngân hàng',
      paymentTime: '09:10 18-07-2024',
   },
   {
      billMonth: 'Tháng 8 2024',
      amount: 63000,
      billMethod: 'Tiền mặt',
      paymentTime: '12:00 05-08-2024',
   },
   {
      billMonth: 'Tháng 9 2024',
      amount: 65000,
      billMethod: 'Momo',
      paymentTime: '17:20 10-09-2024',
   },
   {
      billMonth: 'Tháng 10 2024',
      amount: 67000,
      billMethod: 'VN Pay',
      paymentTime: '10:50 01-10-2024',
   },
   {
      billMonth: 'Tháng 11 2024',
      amount: 68000,
      billMethod: 'Chuyển khoản ngân hàng',
      paymentTime: '08:30 17-11-2024',
   },
] as Payment[];

const PaymentTable = () => {
   const dispatch = useAppDispatch();

   // fetch data table
   //    useLayoutEffect(() => {
   //       dispatch(manageUserStore.firstFetchAction(entityType));
   //    }, []);

   const columns = [
      {
         field: 'billMonth',
         flex: 0.5,
         minWidth: 100,
         headerName: 'Tháng thanh toán',
         ...centerColumn,
         renderCell(params) {
            return <span>{params.row.billMonth}</span>;
         },
      },
      {
         field: 'amount',
         flex: 0.5,
         minWidth: 100,
         headerName: 'Số tiền',
         ...formatNumbericColumn,
         renderCell(params) {
            return (
               <span style={{ paddingRight: 'calc(50% - 45px)' }}>
                  {params.row.amount.toLocaleString()} VND
               </span>
            );
         },
      },
      {
         field: 'billMethod',
         flex: 0.6,
         minWidth: 100,
         headerName: 'Phương thức thanh toán',
         ...centerColumn,
         renderCell(params) {
            return <span>{params.row.billMethod}</span>;
         },
      },
      {
         field: 'paymentTime',
         flex: 0.6,
         minWidth: 150,
         headerName: 'Thời gian thanh toán',
         ...centerColumn,
         renderCell(params) {
            return (
               <>
                  {params.row?.paymentTime ? (
                     <span
                        style={{
                           backgroundColor: 'rgb(232, 255, 230)',
                           padding: '5px 10px',
                           borderRadius: 30,
                        }}
                     >
                        {params.row?.paymentTime}
                     </span>
                  ) : (
                     <Button
                        sx={{
                           //    backgroundColor: ' 	#AD373B',
                           //    padding: '5px 10px',
                           //    borderRadius: 30,
                           cursor: 'pointer',
                        }}
                        variant="outlined"
                     >
                        Thanh toán ngay
                     </Button>
                  )}
               </>
            );
         },
      },
   ];

   const handleChangePage = (pageNo: number) => {
      // dispatch(commonStore.actions.setTableState({ pageNo }));
      // dispatch(bookingStore.sagaGetList());
   };

   const handleChangePerPage = (perPage: number) => {
      // dispatch(commonStore.actions.setTableState({ perPage }));
      // handleChangePage(1);
   };

   return (
      <Grid container sx={{ height: `calc(100vh - 150px)` }}>
         <AppDataTable rows={payments} columns={columns} getRowId={(params) => params?.billMonth} />
         {/* <DataTablePagination
            page={1}
            perPage={10}
            totalItems={200}
            onChangePage={handleChangePage}
            onChangePerPage={handleChangePerPage}
            lastUpdatedAt={clientLatestUpdatedTime}
            lastUpdatedBy={serverLastUpdatedBy}
         /> */}
      </Grid>
   );
};

export default React.memo(PaymentTable);

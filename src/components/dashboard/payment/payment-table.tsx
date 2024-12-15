'use client';

import paymentApi from '@/api/payment.api';
import { DataTablePagination } from '@/components/DataTable';
import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { commonStore, paymentStore } from '@/store/slices';
import { Payment } from '@/types/payment';
import { centerColumn, formatNumbericColumn } from '@/utils/columnProperties';
import { formatDateTime } from '@/utils/formatCell';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';

// const payments = [
//    {
//       billMonth: 'Tháng 1 2023',
//       amount: 35000,
//       billMethod: 'VN Pay',
//       paymentTime: '10:15 15-01-2023',
//    },
//    {
//       billMonth: 'Tháng 2 2023',
//       amount: 40000,
//       billMethod: 'Momo',
//       paymentTime: null,
//    },
//    {
//       billMonth: 'Tháng 3 2023',
//       amount: 42000,
//       billMethod: 'Zalo Pay',
//       paymentTime: '08:10 05-03-2023',
//    },
//    {
//       billMonth: 'Tháng 4 2023',
//       amount: 46000,
//       billMethod: 'Thẻ tín dụng',
//       paymentTime: '18:30 10-04-2023',
//    },
//    {
//       billMonth: 'Tháng 5 2023',
//       amount: 39000,
//       billMethod: 'Chuyển khoản ngân hàng',
//       paymentTime: null,
//    },
//    {
//       billMonth: 'Tháng 6 2023',
//       amount: 37000,
//       billMethod: 'VN Pay',
//       paymentTime: '16:00 11-06-2023',
//    },
//    {
//       billMonth: 'Tháng 7 2023',
//       amount: 41000,
//       billMethod: 'Momo',
//       paymentTime: '09:25 03-07-2023',
//    },
//    {
//       billMonth: 'Tháng 8 2023',
//       amount: 43000,
//       billMethod: 'Tiền mặt',
//       paymentTime: '11:45 12-08-2023',
//    },
//    {
//       billMonth: 'Tháng 9 2023',
//       amount: 48000,
//       billMethod: 'Chuyển khoản ngân hàng',
//       paymentTime: '17:30 27-09-2023',
//    },
//    {
//       billMonth: 'Tháng 10 2023',
//       amount: 50000,
//       billMethod: 'Zalo Pay',
//       paymentTime: '14:40 05-10-2023',
//    },
//    {
//       billMonth: 'Tháng 11 2023',
//       amount: 49000,
//       billMethod: 'Thẻ tín dụng',
//       paymentTime: '13:30 15-11-2023',
//    },
//    {
//       billMonth: 'Tháng 12 2023',
//       amount: 52000,
//       billMethod: 'Chuyển khoản ngân hàng',
//       paymentTime: '09:00 20-12-2023',
//    },
//    {
//       billMonth: 'Tháng 1 2024',
//       amount: 55000,
//       billMethod: 'Tiền mặt',
//       paymentTime: '11:50 01-01-2024',
//    },
//    {
//       billMonth: 'Tháng 2 2024',
//       amount: 57000,
//       billMethod: 'VN Pay',
//       paymentTime: '10:30 18-02-2024',
//    },
//    {
//       billMonth: 'Tháng 3 2024',
//       amount: 58000,
//       billMethod: 'Momo',
//       paymentTime: '14:25 07-03-2024',
//    },
//    {
//       billMonth: 'Tháng 4 2024',
//       amount: 59000,
//       billMethod: 'Zalo Pay',
//       paymentTime: '16:10 21-04-2024',
//    },
//    {
//       billMonth: 'Tháng 5 2024',
//       amount: 60000,
//       billMethod: 'Chuyển khoản ngân hàng',
//       paymentTime: '15:45 02-05-2024',
//    },
//    {
//       billMonth: 'Tháng 6 2024',
//       amount: 61000,
//       billMethod: 'Thẻ tín dụng',
//       paymentTime: '18:35 10-06-2024',
//    },
//    {
//       billMonth: 'Tháng 7 2024',
//       amount: 62000,
//       billMethod: 'Chuyển khoản ngân hàng',
//       paymentTime: '09:10 18-07-2024',
//    },
//    {
//       billMonth: 'Tháng 8 2024',
//       amount: 63000,
//       billMethod: 'Tiền mặt',
//       paymentTime: '12:00 05-08-2024',
//    },
//    {
//       billMonth: 'Tháng 9 2024',
//       amount: 65000,
//       billMethod: 'Momo',
//       paymentTime: '17:20 10-09-2024',
//    },
//    {
//       billMonth: 'Tháng 10 2024',
//       amount: 67000,
//       billMethod: 'VN Pay',
//       paymentTime: '10:50 01-10-2024',
//    },
//    {
//       billMonth: 'Tháng 11 2024',
//       amount: 68000,
//       billMethod: 'Chuyển khoản ngân hàng',
//       paymentTime: '08:30 17-11-2024',
//    },
// ] as Payment[];

const PaymentTable = () => {
   const dispatch = useAppDispatch();
   const tableState = useAppSelector(paymentStore.selectDataTable);
   const router = useRouter();
   //fetch data table
   useLayoutEffect(() => {
      dispatch(paymentStore.firstFetchAction());
   }, []);

   const columns = [
      {
         field: 'billMonth',
         flex: 0.5,
         headerName: 'Tháng thanh toán',
         ...centerColumn,
         renderCell(params) {
            return <span>{params.row.billMonth}</span>;
         },
      },
      {
         field: 'amount',
         flex: 0.5,
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
         headerName: 'Phương thức thanh toán',
         ...centerColumn,
         renderCell(params) {
            return <span>{params.row.isPaid && params.row.billMethod}</span>;
         },
      },
      {
         field: 'paymentTime',
         flex: 0.6,
         headerName: 'Thời gian thanh toán',
         ...centerColumn,
         renderCell(params) {
            return (
               <>
                  {params.row?.isPaid ? (
                     <span
                        style={{
                           backgroundColor: 'rgb(232, 255, 230)',
                           padding: '5px 10px',
                           borderRadius: 30,
                        }}
                     >
                        {formatDateTime(params.row?.paymentTime)}
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
                        onClick={() => handleSubmitPay(params?.row.id)}
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
      dispatch(paymentStore.actions.setTableState({ pageNo }));
      dispatch(paymentStore.firstFetchAction());
   };

   const handleChangePerPage = (pageSize: number) => {
      dispatch(paymentStore.actions.setTableState({ pageSize }));
      handleChangePage(1);
   };

   const handleSubmitPay = async (paymentId: number) => {
      try {
         const response = await paymentApi.handlePayAmount({ paymentId });

         console.log(response);

         const paymentUrl = response.data.paymentUrl;
         // router.push(paymentUrl);

         window.open(paymentUrl, '_blank');
      } catch (error) {
         console.log(error);
         dispatch(
            commonStore.actions.setErrorMessage(
               'Đã xảy ra lỗi không mong muốn, tạm thời không thể giao dịch'
            )
         );
      }

      //dispatch(paymentStore.payAction(paymentId));
   };

   return (
      <Grid
         container
         sx={{ height: `calc(100vh - 150px)`, width: '100%', flexDirection: 'column' }}
      >
         <AppDataTable rows={tableState.rows} columns={columns} getRowId={(params) => params?.id} />
         <DataTablePagination
            page={tableState.pageNo}
            perPage={tableState.pageSize}
            totalItems={tableState.totalItems}
            onChangePage={handleChangePage}
            onChangePerPage={handleChangePerPage}
         />
      </Grid>
   );
};

export default React.memo(PaymentTable);

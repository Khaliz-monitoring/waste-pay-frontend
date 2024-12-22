'use client';

import paymentApi from '@/api/payment.api';
import { DataTablePagination } from '@/components/DataTable';
import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { accountStore, commonStore, paymentStore } from '@/store/slices';
import { centerColumn, formatNumbericColumn } from '@/utils/columnProperties';
import { formatDateTime } from '@/utils/formatCell';
import { Button, Grid } from '@mui/material';
import React, { useLayoutEffect } from 'react';

interface PaymentTableProps {
   userId: number;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ userId }) => {
   const dispatch = useAppDispatch();
   const tableState = useAppSelector(paymentStore.selectDataTable);
   const currentUserId = useAppSelector(accountStore.selectUserId);

   //fetch data table
   useLayoutEffect(() => {
      dispatch(paymentStore.actions.setUserId(userId));
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
            return <span>{params.row.isPaid && params.row.paymentGateway}</span>;
         },
      },
      {
         field: 'paymentTime',
         flex: 0.6,
         headerName: 'Thời gian thanh toán',
         ...centerColumn,
         renderCell(params) {
            return <PaymentTime row={params?.row} isOwnPayment={userId == currentUserId} />;
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

const PaymentTime = ({ row, isOwnPayment }) => {
   const dispatch = useAppDispatch();

   console.log(row.isPaid, isOwnPayment);

   const handleSubmitPay = async (paymentId: number) => {
      try {
         const response = await paymentApi.handlePayAmount({ paymentId });

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
   };

   if (row?.isPaid)
      return (
         <span
            style={{
               backgroundColor: 'rgb(232, 255, 230)',
               padding: '5px 10px',
               borderRadius: 30,
            }}
         >
            {formatDateTime(row?.paymentTime)}
         </span>
      );

   if (isOwnPayment)
      return (
         <Button
            sx={{
               //    backgroundColor: ' 	#AD373B',
               //    padding: '5px 10px',
               //    borderRadius: 30,
               cursor: 'pointer',
            }}
            variant="outlined"
            onClick={() => handleSubmitPay(row.id)}
         >
            Thanh toán ngay
         </Button>
      );

   return (
      <span
         style={{
            backgroundColor: 'rgb(255, 190, 190)',
            padding: '5px 10px',
            borderRadius: 30,
         }}
      >
         Chưa thanh toán
      </span>
   );
};

export default React.memo(PaymentTable);

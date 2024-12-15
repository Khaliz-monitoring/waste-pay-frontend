'use client';

import { DataTablePagination } from '@/components/DataTable';
import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { ERole } from '@/enums/role.enum';
import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';
import { centerColumn, centerHeaderColumn } from '@/utils/columnProperties';
import { getAvatar } from '@/utils/get-avatar.utils';
import { stringAvatar } from '@/utils/string-avatar';
import { Avatar, Box, Grid } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import StatusButton from './StatusButton';
import { TableState } from '@/types/table-state';

interface UserTableProps {
   role: ERole;
}

const UserTable: React.FC<UserTableProps> = ({ role }) => {
   const dispatch = useAppDispatch();
   const dataTable = useSelector(manageUserStore.selectTableData(role));

   // fetch data table
   useLayoutEffect(() => {
      dispatch(manageUserStore.firstFetchAction(role));
   }, []);

   const columns = [
      {
         field: 'name',
         flex: 0.5,
         minWidth: 100,
         headerName: 'Tên',
         ...centerHeaderColumn,
         renderCell(params) {
            return (
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                  {params.row?.avatar ? (
                     <Avatar src={getAvatar(params.row.avatar)} />
                  ) : (
                     <Avatar {...stringAvatar(params.row?.fullName)} />
                  )}
                  <span
                     style={{ fontWeight: 500 }}
                  >{`${params.row?.fullName ? params.row?.fullName : ''}`}</span>
               </Box>
            );
         },
      },
      // {
      //    field: 'email',
      //    flex: 0.6,
      //    minWidth: 100,
      //    headerName: 'Email',
      // },
      {
         field: 'address',
         flex: 0.9,
         minWidth: 100,
         headerName: 'Địa Chỉ',
         ...centerHeaderColumn,
         renderCell(params) {
            return (
               <span>
                  {params.row?.address
                     ? `${params.row?.address?.fullName}, ${params.row?.address?.ward?.fullName}, ${params.row?.address?.ward?.district?.fullName}, ${params.row?.address?.ward?.district?.province?.fullName}`
                     : ''}
               </span>
            );
         },
      },
      {
         field: 'phoneNumber',
         flex: 0.3,
         minWidth: 100,
         headerName: 'Phone',
         ...centerHeaderColumn,
      },
      {
         field: 'manager',
         flex: 0.3,
         minWidth: 100,
         headerName: 'Quản Lý',
         ...centerHeaderColumn,
      },
      ...(role === ERole.USER
         ? [
              {
                 field: 'paymentTime',
                 flex: 0.4,
                 minWidth: 150,
                 headerName: 'Trạng Thái Thanh Toán',
                 ...centerColumn,
                 renderCell(params) {
                    return (
                       <>
                          {params.row?.amountPayable ? (
                             <span
                                style={{
                                   // backgroundColor: ' 	#AD373B',
                                   border: '1px solid rgb(234, 85, 85)',
                                   padding: '10px 20px',
                                   borderRadius: 4,
                                   cursor: 'pointer',
                                   color: 'rgb(185, 0, 0)',
                                }}
                             >
                                {`Còn nợ ${params.row?.amountPayable.toLocaleString()}đ`}
                             </span>
                          ) : (
                             <span
                                style={{
                                   // backgroundColor: 'rgb(232, 255, 230)',
                                   padding: '7px 15px',
                                   borderRadius: 5,
                                   color: 'green',
                                }}
                             >
                                Hoàn thành
                             </span>
                          )}
                       </>
                    );
                 },
              },
           ]
         : []),
      {
         field: 'status',
         flex: 0.4,
         minWidth: 150,
         headerName: 'Trạng Thái',
         ...centerColumn,
         renderCell(params) {
            return <StatusButton state={params.row?.state} />;
         },
      },
   ];

   const handleChangePage = (pageNo: number) => {
      const tableData = { pageNo } as TableState;
      dispatch(manageUserStore.actions.setUserList({ role, tableData }));
      dispatch(manageUserStore.firstFetchAction(role));
   };

   const handleChangePerPage = (pageSize: number) => {
      const tableData = { pageSize } as TableState;

      dispatch(manageUserStore.actions.setUserList({ role, tableData }));
      handleChangePage(1);
   };

   return (
      <Grid sx={{ height: `calc(100vh - 270px)`, width: '100%' }}>
         <AppDataTable rows={dataTable?.rows} columns={columns} getRowId={(params) => params.id} />
         <DataTablePagination
            page={dataTable?.pageNo}
            perPage={dataTable?.pageSize}
            totalItems={dataTable.totalItems}
            onChangePage={handleChangePage}
            onChangePerPage={handleChangePerPage}
         />
      </Grid>
   );
};

export default UserTable;

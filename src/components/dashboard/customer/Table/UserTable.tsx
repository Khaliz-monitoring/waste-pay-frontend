'use client';

import { DataTablePagination } from '@/components/DataTable';
import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';
import { EntityType, TableState } from '@/types/mange-user';
import { centerColumn, centerHeaderColumn } from '@/utils/columnProperties';
import { stringAvatar } from '@/utils/string-avatar';
import { Avatar, Box } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

interface UserTableProps {
   entityType: EntityType;
}

const UserTable: React.FC<UserTableProps> = ({ entityType }) => {
   const dispatch = useAppDispatch();
   const dataTable = useSelector(manageUserStore.selectTableData(entityType));

   console.log(dataTable);

   // fetch data table
   useLayoutEffect(() => {
      dispatch(manageUserStore.firstFetchAction(entityType));
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
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar {...stringAvatar(params.row?.lastName)} />
                  <span
                     style={{ fontWeight: 500 }}
                  >{`${params.row?.firstName} ${params.row?.lastName}`}</span>
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
      },
      {
         field: 'phone',
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
      ...(entityType === 'user'
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
                          {params.row?.lastName.charAt(0) === 'S' ? (
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
                                Còn nợ 40000đ
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
   ];

   const handleChangePage = (pageNo: number) => {
      const tableData = { pageNo } as TableState;
      dispatch(manageUserStore.actions.setUserList({ entityType, tableData }));
      dispatch(manageUserStore.firstFetchAction(entityType));
   };

   const handleChangePerPage = (pageSize: number) => {
      const tableData = { pageSize } as TableState;

      dispatch(manageUserStore.actions.setUserList({ entityType, tableData }));
      handleChangePage(1);
   };

   return (
      <Box sx={{ height: `calc(100vh - 270px)`, width: '100%' }}>
         <AppDataTable rows={dataTable?.rows} columns={columns} getRowId={(params) => params.id} />
         <DataTablePagination
            page={dataTable?.pageNo}
            perPage={dataTable?.pageSize}
            totalItems={dataTable.totalItems}
            onChangePage={handleChangePage}
            onChangePerPage={handleChangePerPage}
            handleChangePerPage
         />
      </Box>
   );
};

export default UserTable;

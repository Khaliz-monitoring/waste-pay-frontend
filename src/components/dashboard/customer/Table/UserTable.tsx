'use client';

import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { Avatar, Box, Button, Grid } from '@mui/material';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import dayjs from 'dayjs';
import { DataTablePagination } from '@/components/DataTable';
import { useAppDispatch } from '@/store/hooks';
import { EntityType } from '@/types/mange-user';
import { manageUserStore } from '@/store/slices';
import { useLayoutEffect } from 'react';
import { stringAvatar } from '@/utils/string-avatar';
import { useSelector } from 'react-redux';
import { centerColumn, centerHeaderColumn } from '@/utils/columnProperties';

const customers = [
   {
      id: 'USR-010',
      name: 'Alcides Antonio',
      avatar: '/assets/avatar-10.png',
      email: 'alcides.antonio@devias.io',
      phone: '908-691-3242',
      address: {
         city: 'Madrid',
         country: 'Spain',
         state: 'Comunidad de Madrid',
         street: '4158 Hedge Street',
      },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-009',
      name: 'Marcus Finn',
      avatar: '/assets/avatar-9.png',
      email: 'marcus.finn@devias.io',
      phone: '415-907-2647',
      address: {
         city: 'Carson City',
         country: 'USA',
         state: 'Nevada',
         street: '2188 Armbrester Drive',
      },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-008',
      name: 'Jie Yan',
      avatar: '/assets/avatar-8.png',
      email: 'jie.yan.song@devias.io',
      phone: '770-635-2682',
      address: {
         city: 'North Canton',
         country: 'USA',
         state: 'Ohio',
         street: '4894 Lakeland Park Drive',
      },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-007',
      name: 'Nasimiyu Danai',
      avatar: '/assets/avatar-7.png',
      email: 'nasimiyu.danai@devias.io',
      phone: '801-301-7894',
      address: {
         city: 'Salt Lake City',
         country: 'USA',
         state: 'Utah',
         street: '368 Lamberts Branch Road',
      },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-006',
      name: 'Iulia Albu',
      avatar: '/assets/avatar-6.png',
      email: 'iulia.albu@devias.io',
      phone: '313-812-8947',
      address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-005',
      name: 'Fran Perez',
      avatar: '/assets/avatar-5.png',
      email: 'fran.perez@devias.io',
      phone: '712-351-5711',
      address: {
         city: 'Atlanta',
         country: 'USA',
         state: 'Georgia',
         street: '1865 Pleasant Hill Road',
      },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },

   {
      id: 'USR-004',
      name: 'Penjani UserTableInyene',
      avatar: '/assets/avatar-4.png',
      email: 'penjani.inyene@devias.io',
      phone: '858-602-3409',
      address: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-003',
      name: 'Carson Darrin',
      avatar: '/assets/avatar-3.png',
      email: 'carson.darrin@devias.io',
      phone: '304-428-3097',
      address: { city: 'Cleveland', country: 'USA', state: 'Ohio', street: '2849 Fulton Street' },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-002',
      name: 'Siegbert Gottfried',
      avatar: '/assets/avatar-2.png',
      email: 'siegbert.gottfried@devias.io',
      phone: '702-661-1654',
      address: {
         city: 'Los Angeles',
         country: 'USA',
         state: 'California',
         street: '1798 Hickory Ridge Drive',
      },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
   {
      id: 'USR-001',
      name: 'Miron Vitold',
      avatar: '/assets/avatar-1.png',
      email: 'miron.vitold@devias.io',
      phone: '972-333-4106',
      address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
      createdAt: dayjs().subtract(2, 'hours').toDate(),
   },
] satisfies Customer[];

function stringToColor(string: string) {
   let hash = 0;
   let i;

   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }

   let color = '#';

   for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */

   return color;
}

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
      // dispatch(commonStore.actions.setTableState({ pageNo }));
      // dispatch(bookingStore.sagaGetList());
   };

   const handleChangePerPage = (perPage: number) => {
      // dispatch(commonStore.actions.setTableState({ perPage }));
      // handleChangePage(1);
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
         />
      </Box>
   );
};

export default UserTable;

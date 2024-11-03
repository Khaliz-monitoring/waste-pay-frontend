import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import type { Metadata } from 'next';
import * as React from 'react';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import { config } from '@/config';
import AppDataTable from '@/components/DataTable/AppDataGridPro';
import { Grid, Paper } from '@mui/material';
import { DataTable, DataTablePagination } from '@/components';
import UserTable from '@/components/dashboard/customer/Table/UserTable';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const page = 0;
   const rowsPerPage = 5;

   const heightComponentExcludingTable = 0;

   const columns = [
      {
         field: 'name',
         flex: 0.5,
         minWidth: 100,
         headerName: 'Name',
         renderCell(params) {
            return <span>{params.row.name}</span>;
         },
      },
      {
         field: 'email',
         flex: 0.6,
         minWidth: 100,
         headerName: 'Email',
      },
      {
         field: 'location',
         flex: 0.5,
         minWidth: 100,
         headerName: 'Location',
      },
      {
         field: 'phone',
         flex: 0.5,
         minWidth: 100,
         headerName: 'Phone',
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
      <Stack spacing={3}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Manager 2</Typography>
            </Stack>
            <div>
               <Button
                  startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
                  variant="contained"
               >
                  Add
               </Button>
            </div>
         </Stack>
         <CustomersFilters />
         <Paper
            elevation={1}
            sx={{
               marginTop: 2,
               position: 'relative',
               '& .highlight-cell': {
                  backgroundColor: '#e7a800',
               },
            }}
         >
            <Grid container sx={{ height: `calc(100vh - ${heightComponentExcludingTable}px)` }}>
               <UserTable />
            </Grid>

            {/* <DataTablePagination
               page={1}
               perPage={100}
               totalItems={1000}
               onChangePage={handleChangePage}
               onChangePerPage={handleChangePerPage}
            /> */}
         </Paper>
      </Stack>
   );
}

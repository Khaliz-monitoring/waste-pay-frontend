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
import { EntityType } from '@/types/mange-user';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const entityType = 'commune' as EntityType;

   const heightComponentExcludingTable = 0;

   return (
      <Stack spacing={3}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Quản Lý Cấp Xã</Typography>
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
               <UserTable entityType={entityType} />
            </Grid>
         </Paper>
      </Stack>
   );
}

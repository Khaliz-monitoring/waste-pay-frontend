import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import type { Metadata } from 'next';
import * as React from 'react';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import UserTable from '@/components/dashboard/customer/Table/UserTable';
import { config } from '@/config';
import { EntityType } from '@/types/mange-user';
import { Box, Grid } from '@mui/material';
import AddUserDialog from '@/components/dashboard/createDIalog';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const entityType = 'district' as EntityType;

   return (
      <Stack spacing={2}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Quản Lý Cấp Huyện</Typography>
            </Stack>
            <Box>
               <AddUserDialog entityType={entityType} />
            </Box>
         </Stack>
         <CustomersFilters />

         <Grid container>
            <UserTable entityType={entityType} />
         </Grid>
      </Stack>
   );
}

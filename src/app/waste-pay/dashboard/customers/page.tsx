import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import * as React from 'react';

import AddUserDialog from '@/components/dashboard/createDIalog';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import UserTable from '@/components/dashboard/customer/Table/UserTable';
import { config } from '@/config';
import { EntityType } from '@/types/mange-user';
import { Box, Grid } from '@mui/material';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const entityType: EntityType = 'user';

   return (
      <Stack spacing={2}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Hộ Gia Đình</Typography>
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

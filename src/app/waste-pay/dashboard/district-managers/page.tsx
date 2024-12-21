import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Metadata } from 'next';
import * as React from 'react';

import AddUserDialog from '@/components/dashboard/createDIalog';
import CustomersFilters from '@/components/dashboard/customer/customers-filters';
import UserTable from '@/components/dashboard/customer/Table/UserTable';
import { config } from '@/config';
import { ERole } from '@/enums/role.enum';
import { Box, Grid } from '@mui/material';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const role: ERole = ERole.DISTRICT;

   return (
      <Stack spacing={2}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Quản Lý Cấp Huyện</Typography>
            </Stack>
            <Box>
               <AddUserDialog role={role} />
            </Box>
         </Stack>
         <CustomersFilters role={role} />

         <Grid container>
            <UserTable role={role} />
         </Grid>
      </Stack>
   );
}

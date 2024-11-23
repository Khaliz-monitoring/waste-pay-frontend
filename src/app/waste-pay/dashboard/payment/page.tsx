import Grid from '@mui/material/Unstable_Grid2';
import type { Metadata } from 'next';
import * as React from 'react';

import UserTable from '@/components/dashboard/customer/Table/UserTable';
import { config } from '@/config';
import { EntityType } from '@/types/mange-user';
import { Stack, Typography } from '@mui/material';
import PaymentTable from '@/components/dashboard/payment/payment-table';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
   const entityType = 'commune' as EntityType;

   return (
      <Stack spacing={2}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Thanh Toán</Typography>
            </Stack>
         </Stack>

         <Grid container>
            <PaymentTable />
         </Grid>
      </Stack>
   );
}

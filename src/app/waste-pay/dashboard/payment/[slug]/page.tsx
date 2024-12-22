import Grid from '@mui/material/Unstable_Grid2';
import type { Metadata } from 'next';
import * as React from 'react';

import PaymentTable from '@/components/dashboard/payment/payment-table';
import { config } from '@/config';
import { Stack, Typography } from '@mui/material';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default async function Page({
   params,
}: {
   params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
   const slug: number = Number((await params).slug);

   return (
      <Stack spacing={2}>
         <Stack direction="row">
            <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
               <Typography variant="h4">Thanh Toán</Typography>
            </Stack>
         </Stack>

         <Grid container>
            <PaymentTable userId={slug} />
         </Grid>
      </Stack>
   );
}

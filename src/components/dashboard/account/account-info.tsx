'use client';

import { useAppSelector } from '@/store/hooks';
import { accountStore } from '@/store/slices';
import { getAvatar } from '@/utils/get-avatar.utils';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export function AccountInfo(): React.JSX.Element {
   const user = useAppSelector(accountStore.selectUserInfo);

   return (
      <Card>
         <CardContent>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
               <div>
                  <Avatar src={getAvatar(user?.avatar)} sx={{ height: '80px', width: '80px' }} />
               </div>
               <Stack spacing={1} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{user?.fullName}</Typography>

                  <Typography color="text.secondary" variant="body2">
                     {user?.phoneNumber}
                  </Typography>

                  <Typography color="text.secondary" variant="body2">
                     {user?.email || ''}
                  </Typography>

                  <Typography
                     color="text.secondary"
                     variant="body2"
                     sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '3px',
                     }}
                  >
                     <Typography color="text.secondary" variant="body2">
                        {user?.address?.fullName},
                     </Typography>
                     <Typography color="text.secondary" variant="body2">
                        {user?.address?.ward?.fullName},
                     </Typography>
                     <Typography color="text.secondary" variant="body2">
                        {user?.address?.ward?.district?.fullName},
                     </Typography>
                     {user?.address?.ward?.district?.province?.fullName}
                  </Typography>
               </Stack>
            </Stack>
         </CardContent>
         <Divider />
         <CardActions>
            <Button fullWidth variant="text">
               Tải ảnh đại diện
            </Button>
         </CardActions>
      </Card>
   );
}

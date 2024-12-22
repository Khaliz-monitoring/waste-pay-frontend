'use client';

import ExtenalLabelTextField from '@/components/common/ExtenalLabelTextField';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { accountStore } from '@/store/slices';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';

const states = [
   { value: 'alabama', label: 'Alabama' },
   { value: 'new-york', label: 'New York' },
   { value: 'san-francisco', label: 'San Francisco' },
   { value: 'los-angeles', label: 'Los Angeles' },
] as const;

const StyledExtenalLabelTextField = styled(ExtenalLabelTextField)(() => ({
   '& .MuiOutlinedInput-input.Mui-disabled': {
      color: 'black',
      '-webkit-text-fill-color': 'unset',
   },
}));

export function AccountDetailsForm(): React.JSX.Element {
   const user = useAppSelector(accountStore.selectUserInfo);
   const dispatch = useAppDispatch();

   const handleOpenUpdateUserDialog = () => {
      dispatch(accountStore.actions.initUpdatedUserInfo());
      //   dispatch(accountStore.actions.setOpenUpdateUserDialog(true));
   };

   return (
      <form
         onSubmit={(event) => {
            event.preventDefault();
         }}
      >
         <Card>
            <CardHeader
               title="Thông tin tài khoản"
               // subheader="The information can be edited"
            />
            <Divider />
            <CardContent>
               <Grid container spacing={2}>
                  <Grid md={6} xs={12}>
                     <StyledExtenalLabelTextField
                        label={'Họ tên'}
                        value={user?.fullName}
                        disabled
                     />
                  </Grid>

                  <Grid md={6} xs={12}>
                     <StyledExtenalLabelTextField
                        label={'Số điện thoại'}
                        value={user?.phoneNumber}
                        disabled
                     />
                  </Grid>

                  <Grid md={12} xs={12}>
                     <StyledExtenalLabelTextField
                        label={'Địa chỉ'}
                        value={`${user?.address?.fullName}, ${user?.address?.ward?.fullName}, ${user?.address?.ward?.district?.fullName}, ${user?.address?.ward?.district?.province?.fullName}`}
                        disabled
                     />
                  </Grid>
               </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
               <Button variant="contained" onClick={handleOpenUpdateUserDialog}>
                  Cập nhập thông tin
               </Button>
            </CardActions>
         </Card>
      </form>
   );
}

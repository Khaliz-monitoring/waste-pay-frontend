'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useUser } from '@/hooks/use-user';
import ExtenalLabelTextField from '@/components/common/ExtenalLabelTextField';
import { styled } from '@mui/material';

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
   const { user } = useUser();

   const [openUpdateUser, setOpenUpdateUser] = React.useState(false);

   const handleCloseUpdateUserDialog = () => {
      setOpenUpdateUser(false);
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
               <Button variant="contained">Save details</Button>
            </CardActions>
         </Card>
      </form>
   );
}

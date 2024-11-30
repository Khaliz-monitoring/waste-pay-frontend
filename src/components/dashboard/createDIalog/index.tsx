'use client';

import { ERole } from '@/enums/role.enum';
import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Divider, IconButton, Popover, TextField, Typography } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import React, { useEffect, useState } from 'react';

interface AddUserDialogProps {
   role: ERole;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ role }) => {
   const dispatch = useAppDispatch();
   const [open, setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
   //const [email, setEmail] = useState('');
   //const [emailError, setEmailError] = useState(false);
   const [phoneNumber, setPhoneNumber] = useState('');

   const [phoneNumberError, setPhoneNumberError] = useState(false);
   const [enableSubmit, setEnableSubmit] = useState(false);

   const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleEmailChange = (e) => {
      const phoneStr = e.target.value;
      setPhoneNumber(phoneStr);
      checkValidPhoneNumber(phoneStr);
   };

   const checkValidPhoneNumber = (phoneStr: string) => {
      // check input is only number
      if (!/^\d*$/.test(phoneStr) || (phoneStr.length !== 10 && phoneStr.length !== 11)) {
         setPhoneNumberError(true);
      } else {
         setPhoneNumberError(false);
      }
   };

   const handleSubmit = () => {
      if (phoneNumber !== '' && !phoneNumberError) {
         dispatch(manageUserStore.addUserAction({ role, phoneNumber }));
      }
   };

   useEffect(() => {
      if (phoneNumber !== '' && !phoneNumberError) {
         setEnableSubmit(true);
      } else {
         setEnableSubmit(false);
      }
   }, [phoneNumber, phoneNumberError]);

   return (
      <>
         <Button
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
            onClick={handleOpen}
         >
            Add
         </Button>

         <Popover
            open={open}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'right',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            anchorEl={anchorEl}
         >
            <Box
               sx={{
                  width: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  borderRadius: 1,
                  border: '1px solid #d9ddea',
                  paddingTop: 1,
               }}
            >
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     paddingX: 1,
                     alignItems: 'center',
                  }}
               >
                  <Typography sx={{ marginLeft: 1 }}>Add new User</Typography>
                  <IconButton sx={{ borderRadius: 1 }} onClick={handleClose}>
                     <ClearIcon sx={{ width: 20, height: 20 }} />
                  </IconButton>
               </Box>
               <Divider />
               <TextField
                  value={phoneNumber}
                  onChange={handleEmailChange}
                  required
                  sx={{ marginX: 2, marginY: 1 }}
                  placeholder={'Nhập số điện thoại'}
                  inputProps={{
                     type: 'tel',
                     max: 12,
                  }}
                  error={phoneNumberError}
                  helperText={phoneNumberError ? 'Please enter a valid phone' : ''}
               />

               <Divider />

               <Box sx={{ display: 'flex', justifyContent: 'end', paddingX: 2, paddingBottom: 1 }}>
                  <Button variant="contained" disabled={!enableSubmit} onClick={handleSubmit}>
                     Add
                  </Button>
               </Box>
            </Box>
         </Popover>
      </>
   );
};

export default React.memo(AddUserDialog);

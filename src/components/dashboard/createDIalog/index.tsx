'use client';

import { EntityType } from '@/types/mange-user';
import {
   Box,
   Button,
   Dialog,
   Divider,
   IconButton,
   Popover,
   TextField,
   Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';

interface AddUserDialogProps {
   entityType: EntityType;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({ entityType }) => {
   const dispatch = useAppDispatch();
   const [open, setOpen] = useState(false);
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
   const [email, setEmail] = useState('');
   const [emailError, setEmailError] = useState(false);
   const [enableSubmit, setEnableSubmit] = useState(false);

   const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleEmailChange = (e) => {
      setEmail(e.target.value);
      if (e.target.validity.valid) {
         setEmailError(false);
      } else {
         setEmailError(true);
      }
   };

   const handleSubmit = () => {
      if (email !== '' && !emailError) {
         dispatch(manageUserStore.addUserAction({ entityType, email }));
      }
   };

   useEffect(() => {
      if (email !== '' && !emailError) {
         setEnableSubmit(true);
      } else {
         setEnableSubmit(false);
      }
   }, [email, emailError]);

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
                  value={email}
                  onChange={handleEmailChange}
                  required
                  sx={{ marginX: 2, marginY: 1 }}
                  placeholder={'Enter email'}
                  inputProps={{
                     type: 'email',
                  }}
                  error={emailError}
                  helperText={emailError ? 'Please enter a valid email' : ''}
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

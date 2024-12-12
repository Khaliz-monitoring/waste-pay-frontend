'use client';

import AppAutocomplete from '@/components/Autocomplete';
import ExtenalLabelTextField from '@/components/common/ExtenalLabelTextField';
import { extractEAdministrativeLevel } from '@/enums/administrativeLevel.enum';
import { EUserState } from '@/enums/user-state.enum';
import { useUser } from '@/hooks/use-user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { accountStore } from '@/store/slices';
import { checkValidPassword } from '@/utils/checkFormatPassword';
import { Box, Button, Dialog, styled, TextField, Typography } from '@mui/material';
import { memo, useEffect, useLayoutEffect, useState } from 'react';

const StyledTextField = styled(TextField)(() => ({
   '& .MuiTextField-root': {
      maxHeight: 50,
   },
   '& .MuiAutocomplete-tag': {
      marginLeft: 5,
   },
   '& .MuiInputBase-root': {
      height: 50,
      borderRadius: 4,
      overflow: 'hidden',
   },
   '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #DEE3ED',
      borderRadius: 4,
   },
   '& .MuiOutlinedInput-input': {
      boxSizing: 'inherit',
   },
   '& input': {
      height: 50,
      fontSize: 16,
   },
   '& .MuiInputLabel-root': {
      transform: 'translate(14px, 1px) scale(1)',
      position: 'absolute',
      top: 10,
   },
   '& .MuiInputLabel-shrink': {
      transform: 'translate(15px, -18px) scale(0.9)',
   },
}));

const StyledAppAutocomplete = styled(AppAutocomplete)(() => ({
   '& .MuiTextField-root': {
      maxHeight: 50,
   },
   '& .MuiAutocomplete-tag': {
      marginLeft: 5,
   },
   '& .MuiInputBase-root': {
      height: 50,
      borderRadius: 4,
      overflow: 'hidden',
   },
   '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #DEE3ED',
      borderRadius: 4,
   },
   '& .MuiOutlinedInput-input': {
      boxSizing: 'inherit',
   },
   '& input': {
      height: 50,
      fontSize: 16,
   },
   '& .MuiInputLabel-root': {
      transform: 'translate(14px, 1px) scale(1)',
      position: 'absolute',
      top: 13,
   },
   '& .MuiInputLabel-shrink': {
      transform: 'translate(15px, -18px) scale(0.9)',
   },
}));

const UpdateUserDialog = () => {
   const { user } = useUser();
   const dispatch = useAppDispatch();
   const administrativeLevelFilterOptions = useAppSelector(accountStore.selectFilterOptions);
   const userInfo = useAppSelector(accountStore.selectUserInfo);

   const [open, setOpen] = useState(false);
   // const addressOptions = useAppSelector();
   const [name, setName] = useState(user?.fullName);
   const [phoneNumber, setPhoneNumber] = useState(user?.phone);
   const [newPassword, setNewPassword] = useState('');
   const [checkNewPassword, setCheckNewPassword] = useState('');
   const [newPasswordError, setNewPasswordError] = useState(false);
   const [checkNewPasswordError, setCheckNewPasswordError] = useState(false);

   const handleClose = () => {
      if (user.state !== EUserState.INACTIVE) setOpen(false);
   };

   useEffect(() => {
      // check valid password
      if (!checkValidPassword(newPassword)) {
         if (!newPasswordError) setNewPasswordError(true);
      } else {
         if (newPasswordError) setNewPasswordError(false);
      }

      // check confirm password
      if (checkNewPassword !== newPassword) {
         setCheckNewPasswordError(true);
      } else {
         setCheckNewPasswordError(false);
      }
   }, [newPassword, checkNewPassword]);

   useEffect(() => {
      // if user have not active the account, open update user dialog
      if (user.state === EUserState.INACTIVE) {
         setOpen(true);
      }
   });

   /**
    * update adjusted user on change Address
    * @param field
    * @param option
    */
   const handleChangeAddress = (field: string, option: any) => {
      dispatch(
         accountStore.changeAddressActions({
            field: extractEAdministrativeLevel(field),
            option,
         })
      );
   };

   useLayoutEffect(() => {
      dispatch(accountStore.actions.initUserInfo(user));

      dispatch(accountStore.firstFetchAdministrateLevel());
   }, []);

   return (
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
         <Box sx={{ padding: '20px 40px', width: 800 }}>
            <Box sx={{ pb: 3 }}>
               <Typography variant="h5">Cập nhập thông tin người dùng</Typography>
            </Box>
            <Box>
               <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ width: '70%' }}>
                     <ExtenalLabelTextField label={'Họ tên'} value={name} />
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                     <ExtenalLabelTextField label={'Số điện thoại'} value={phoneNumber} />
                  </Box>
               </Box>

               {user.state === EUserState.INACTIVE && (
                  <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                     <Box sx={{ width: '50%' }}>
                        <ExtenalLabelTextField
                           label={'Mật khẩu mới'}
                           type="password"
                           value={newPassword}
                           error={newPasswordError}
                           onChange={(e) => setNewPassword(e.target.value)}
                           helperText={
                              newPasswordError
                                 ? 'Tối thiểu tám ký tự, ít nhất một chữ cái và một số'
                                 : ''
                           }
                        />
                     </Box>

                     <Box sx={{ flexGrow: 1 }}>
                        <ExtenalLabelTextField
                           label={'Xác nhận mật khẩu mới'}
                           type="password"
                           value={checkNewPassword}
                           onChange={(e) => setCheckNewPassword(e.target.value)}
                           error={checkNewPasswordError}
                           helperText={checkNewPasswordError ? 'Mật khẩu không khớp' : ''}
                        />
                     </Box>
                  </Box>
               )}
               <Box>
                  <Typography
                     sx={{
                        color: '#373B42',
                        width: 'max-content',
                        fontSize: '15px',
                        marginBottom: '10px',
                        paddingLeft: 1,
                     }}
                  >
                     Địa Chỉ
                  </Typography>
                  <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                     <StyledAppAutocomplete
                        value={userInfo?.address?.ward?.district?.province?.fullName}
                        onChange={(e, option) => handleChangeAddress('PROVINCE', option)}
                        options={administrativeLevelFilterOptions.address.PROVINCE}
                        label="Tỉnh / Thành phố"
                        primaryKeyOption="fullName"
                        sx={{ flexGrow: 1 }}
                        renderOption={(prop, option) => `${option.fullName}`}
                        getOptionLabel={(option) => `${option.fullName}`}
                     />

                     <StyledAppAutocomplete
                        value={userInfo?.address?.ward?.district?.fullName}
                        onChange={(e, option) => handleChangeAddress('DISTRICT', option)}
                        options={administrativeLevelFilterOptions.address.DISTRICT}
                        label="Quận / Huyện"
                        primaryKeyOption="fullName"
                        sx={{ flexGrow: 1 }}
                        disabled={!userInfo?.address?.ward?.district?.province?.fullName}
                        renderOption={(prop, option) => `${option.fullName}`}
                        getOptionLabel={(option) => `${option.fullName}`}
                     />

                     <StyledAppAutocomplete
                        value={userInfo?.address?.ward?.fullName}
                        onChange={(e, option) => handleChangeAddress('WARD', option)}
                        options={administrativeLevelFilterOptions.address.WARD}
                        label="Xã / Thị Trấn"
                        primaryKeyOption="fullName"
                        disabled={!userInfo?.address?.ward?.district?.fullName}
                        sx={{ flexGrow: 1 }}
                        renderOption={(prop, option) => `${option.fullName}`}
                        getOptionLabel={(option) => `${option.fullName}`}
                     />
                  </Box>
                  <StyledTextField
                     value={userInfo?.address?.fullName}
                     onChange={(option) =>
                        handleChangeAddress('specificalAddress', option.target.value)
                     }
                     label="Số nhà"
                     sx={{ mt: 2, width: '100%' }}
                     disabled={!userInfo?.address?.ward?.fullName}
                  />
               </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
               <Button variant="outlined">Cập nhập</Button>
            </Box>
         </Box>
      </Dialog>
   );
};

export default memo(UpdateUserDialog);

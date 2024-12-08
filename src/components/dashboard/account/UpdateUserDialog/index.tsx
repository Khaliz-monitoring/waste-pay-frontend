'use client';

import AppAutocomplete from '@/components/Autocomplete';
import ExtenalLabelTextField from '@/components/common/ExtenalLabelTextField';
import { EUserState } from '@/enums/user-state.enum';
import { useUser } from '@/hooks/use-user';
import { checkValidPassword } from '@/utils/checkFormatPassword';
import { Box, Button, Dialog, styled, TextField, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';

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

   const [open, setOpen] = useState(false);
   // const addressOptions = useAppSelector();
   const [name, setName] = useState(user?.fullName);
   const [phoneNumber, setPhoneNumber] = useState(user?.phone);
   const [newPassword, setNewPassword] = useState('');
   const [checkNewPassword, setCheckNewPassword] = useState('');
   const [newPasswordError, setNewPasswordError] = useState(false);
   const [checkNewPasswordError, setCheckNewPasswordError] = useState(false);

   // address
   const [province, setProvince] = useState(user?.address?.ward?.district?.province);
   const [district, setDistrict] = useState(user?.address?.ward?.district);
   const [ward, setWard] = useState(user?.address?.ward);
   const [specificalAddress, setSpecificalAddress] = useState(user?.address?.name);

   // adjusted user info
   const [adjustedUser, setAdjustedUser] = useState(user);

   const handleClose = () => {
      setOpen(false);
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

   const onSubmit = () => {};

   /**
    * update adjusted user on change Address
    * @param field
    * @param option
    */
   const handleChangeAddress = (field: string, option: any) => {
      const address = { ...adjustedUser.address };
      address[field] = option;
      setAdjustedUser((prev) => ({ ...prev, address }));
   };

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
                        value={province}
                        onChange={(option) => handleChangeAddress('PROVINCE', option)}
                        options={[]}
                        label="Tỉnh / Thành phố"
                        sx={{ flexGrow: 1 }}
                     />

                     <StyledAppAutocomplete
                        value={district}
                        onChange={(option) => handleChangeAddress('DISTRICT', option)}
                        options={[]}
                        label="Quận / Huyện"
                        sx={{ flexGrow: 1 }}
                     />

                     <StyledAppAutocomplete
                        value={ward}
                        onChange={(option) => handleChangeAddress('WARD', option)}
                        options={[]}
                        label="Xã / Thị Trấn"
                        sx={{ flexGrow: 1 }}
                     />
                  </Box>
                  <StyledTextField
                     value={specificalAddress}
                     onChange={(option) =>
                        handleChangeAddress('specificalAddress', option.target.value)
                     }
                     label="Số nhà"
                     sx={{ mt: 2, width: '100%' }}
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

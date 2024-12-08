import TextField from '@/components/AppTextField';
import { AppTextFieldProps } from '@/components/AppTextField/type';
import { Box, styled, Typography } from '@mui/material';

import React from 'react';

const StyledAutoComplete = styled(TextField)(() => ({
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

const ExtenalLabelTextField: React.FC<AppTextFieldProps> = (props) => {
   const { label, sx, ...textFieldProps } = props;

   return (
      <Box sx={{ marginBottom: 1.5 }}>
         <Typography
            sx={{
               color: '#373B42',
               width: 'max-content',
               fontSize: '16px',
               marginBottom: '6px',
               paddingLeft: 1,
            }}
         >
            {label}
         </Typography>
         <StyledAutoComplete {...textFieldProps} sx={{ display: 'flex', flexGrow: 1, ...sx }} />
      </Box>
   );
};

export default React.memo(ExtenalLabelTextField);

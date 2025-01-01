'use client';

import { useAppSelector } from '@/store/hooks';
import { paymentStore } from '@/store/slices';
import { Box, Typography } from '@mui/material';
import { memo } from 'react';

const SummaryInfo = () => {
   const userInfo = useAppSelector(paymentStore.selectUserInfo);

   const amountPayable = () => {
      if (userInfo.amountPayable === 0) {
         return 'Đã thanh toán đầy đủ';
      } else {
         return `Còn nợ : ${userInfo.amountPayable?.toLocaleString()} đồng`;
      }
   };

   return (
      <Box sx={{ display: 'flex', paddingRight: 1, flexDirection: 'column' }}>
         <Typography sx={{ fontSize: 18 }}>{userInfo.fullName}</Typography>
         <Typography sx={{ fontSize: 18 }}>{amountPayable()}</Typography>
      </Box>
   );
};

export default memo(SummaryInfo);

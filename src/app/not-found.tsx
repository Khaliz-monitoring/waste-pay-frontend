import * as React from 'react';
import type { Metadata } from 'next';
import RouterLink from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { config } from '@/config';
import { paths } from '@/paths';

export const metadata = { title: `Không tìm thấy | ${config.site.name}` } satisfies Metadata;

export default function NotFound(): React.JSX.Element {
   return (
      <Box
         component="main"
         sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100%' }}
      >
         <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
            <Box>
               <Box
                  component="img"
                  alt="Đang phát triển"
                  src="/assets/error-404.png"
                  sx={{ display: 'inline-block', height: 'auto', maxWidth: '100%', width: '400px' }}
               />
            </Box>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
               404: Trang bạn đang tìm không tồn tại
            </Typography>
            <Typography color="text.secondary" variant="body1" sx={{ textAlign: 'center' }}>
               Bạn đã nhập sai đường dẫn hoặc đây là lỗi nhầm lẫn. Dù lý do là gì, hãy thử sử dụng
               thanh điều hướng.
            </Typography>
            <Button
               component={RouterLink}
               href={paths.home}
               startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
               variant="contained"
            >
               Quay về trang chủ
            </Button>
         </Stack>
      </Box>
   );
}

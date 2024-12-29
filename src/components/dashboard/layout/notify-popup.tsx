import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { usePopover } from '@/hooks/use-popover';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mainbarStore } from '@/store/slices';
import { NotificationItem } from '@/store/slices/main-bar.reducer';
import { getAvatar } from '@/utils/get-avatar.utils';
import { stringAvatar } from '@/utils/string-avatar';
import CircleIcon from '@mui/icons-material/Circle';
import { Avatar, Badge, IconButton, Tooltip } from '@mui/material';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { useLayoutEffect } from 'react';

const NotifyPopover = () => {
   const dispatch = useAppDispatch();
   useLayoutEffect(() => {
      dispatch(mainbarStore.fetchNotifications());
   }, []);
   const notifications = useAppSelector(mainbarStore.selectNotifications);
   const userPopover = usePopover<HTMLDivElement>();

   return (
      <React.Fragment>
         <Tooltip title="Notifications">
            <Box ref={userPopover.anchorRef}>
               <IconButton onClick={userPopover.handleOpen}>
                  <Badge badgeContent={notifications.totalUnread} color="success">
                     <BellIcon />
                  </Badge>
               </IconButton>
            </Box>
         </Tooltip>

         <Popover
            anchorEl={userPopover.anchorRef.current}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClose={userPopover.handleClose}
            open={userPopover.open}
            slotProps={{ paper: { sx: { width: '340px' } } }}
         >
            <Box>
               <Box sx={{ p: '16px 20px ' }}>
                  <Typography sx={{ fontWeight: 500 }}>Thông báo</Typography>
               </Box>
               <Divider />
               <MenuList disablePadding sx={{ height: 'calc(100vh - 130px)', overflow: 'scroll' }}>
                  {notifications.list.length == 0 ? (
                     <Typography sx={{ textAlign: 'center', color: '#6a6a6a', marginTop: '50%' }}>
                        Bạn không có thông báo nào mới
                     </Typography>
                  ) : (
                     notifications.list.map((element) => <NotifyItem {...element} />)
                  )}
               </MenuList>
            </Box>
         </Popover>
      </React.Fragment>
   );
};

const NotifyItem: React.FC<NotificationItem> = ({
   fullName,
   role,
   avatar,
   message,
   time,
   isRead,
}) => {
   return (
      <MenuItem sx={{ display: 'flex', gap: 1, alignItems: 'start', py: 2 }}>
         {avatar ? (
            <Avatar src={getAvatar(avatar)} style={{ marginTop: '4px' }} />
         ) : (
            <Avatar {...stringAvatar(fullName)} style={{ marginTop: '4px' }} />
         )}

         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
               sx={{
                  display: 'inline',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  lineHeight: 1.1,
               }}
            >
               <Typography sx={{ fontWeight: 500, display: fullName ? 'inline' : 'none' }}>
                  {`${fullName} - ${role} `}{' '}
               </Typography>
               {message}
            </Typography>
            <Typography>{time}</Typography>
         </Box>
         <CircleIcon
            sx={{ fontSize: 10, alignSelf: 'center', visibility: isRead ? 'hidden' : 'visible' }}
            color="success"
         />
      </MenuItem>
   );
};

export default React.memo(NotifyPopover);

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { usePopover } from '@/hooks/use-popover';
import { useUser } from '@/hooks/use-user';
import { stringAvatar } from '@/utils/string-avatar';
import { Avatar, Badge, IconButton, Tooltip } from '@mui/material';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import CircleIcon from '@mui/icons-material/Circle';

interface NotifyItemProps {
   ownerLastName: string;
   ownerFirstName: string;
   role: string;
   avatar: string;
   title: string;
   time: string;
   isRead: boolean;
}

const notifyListTest = [
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Tuấn',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'đã đăng một thông báo mới',
      time: '1 phút trước',
      isRead: false,
   },
   {
      ownerLastName: 'Lê',
      ownerFirstName: 'Minh',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'có một cập nhật quan trọng từ cấp trên',
      time: '3 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Trần',
      ownerFirstName: 'Hương',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'thông báo về các thay đổi chính sách mới',
      time: '2 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Phan',
      ownerFirstName: 'An',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'đã hoàn thành việc xử lý yêu cầu của người dân',
      time: '5 phút trước',
      isRead: false,
   },
   {
      ownerLastName: 'Vũ',
      ownerFirstName: 'Tùng',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'có thông báo về dự án mới bắt đầu',
      time: '10 phút trước',
      isRead: false,
   },
   {
      ownerLastName: 'Hoàng',
      ownerFirstName: 'Lan',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã phê duyệt các chính sách mới cho khu vực',
      time: '1 tuần trước',
      isRead: false,
   },
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Hoàng',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'đã thông báo kết quả cuộc khảo sát gần đây',
      time: '15 phút trước',
      isRead: false,
   },
   {
      ownerLastName: 'Lê',
      ownerFirstName: 'Sang',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã cập nhật tiến độ dự án xây dựng',
      time: '1 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Trần',
      ownerFirstName: 'Quang',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã tổ chức cuộc họp quan trọng về chính sách',
      time: '3 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Phan',
      ownerFirstName: 'Bích',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về việc kiểm tra chất lượng công trình',
      time: '2 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Vũ',
      ownerFirstName: 'Mai',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã phê duyệt kế hoạch phát triển cộng đồng',
      time: '5 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Hoàng',
      ownerFirstName: 'Kiên',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã triển khai chiến lược tăng cường hạ tầng',
      time: '4 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Thảo',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về việc tuyển dụng nhân sự mới',
      time: '1 tháng trước',
      isRead: false,
   },
   {
      ownerLastName: 'Lê',
      ownerFirstName: 'Châu',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'thông báo khẩn cấp về tình hình thiên tai',
      time: '1 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Trần',
      ownerFirstName: 'Tâm',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'cập nhật kết quả khảo sát về nhu cầu cộng đồng',
      time: '2 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Phan',
      ownerFirstName: 'Mai',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về tiến độ công trình xây dựng trường học',
      time: '10 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Vũ',
      ownerFirstName: 'Công',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã có báo cáo về tình hình giao thông trong khu vực',
      time: '4 giờ trước',
      isRead: false,
   },
   {
      ownerLastName: 'Hoàng',
      ownerFirstName: 'Duy',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'thông báo về sự kiện quan trọng trong tuần này',
      time: '6 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Tú',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'đã thông báo về các vấn đề liên quan đến môi trường',
      time: '3 phút trước',
      isRead: false,
   },
   {
      ownerLastName: 'Lê',
      ownerFirstName: 'Lan',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'cập nhật tiến độ công trình nhà ở cho người dân',
      time: '7 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Trần',
      ownerFirstName: 'Phong',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã phát hành chính sách hỗ trợ cho các doanh nghiệp',
      time: '5 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Phan',
      ownerFirstName: 'Tuấn',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'đã giải quyết xong khiếu nại của người dân',
      time: '12 phút trước',
      isRead: false,
   },
   {
      ownerLastName: 'Vũ',
      ownerFirstName: 'Hạnh',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'có thông báo về quy định mới về bảo vệ môi trường',
      time: '2 ngày trước',
      isRead: false,
   },
   {
      ownerLastName: 'Hoàng',
      ownerFirstName: 'Hải',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã cập nhật kế hoạch phát triển giao thông công cộng',
      time: '1 tháng trước',
      isRead: false,
   },
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Linh',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về các hoạt động ngoại khóa cho học sinh',
      time: '1 giờ trước',
      isRead: true,
   },
   {
      ownerLastName: 'Lê',
      ownerFirstName: 'Quốc',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã tổ chức hội thảo về giáo dục và đào tạo',
      time: '30 phút trước',
      isRead: true,
   },
   {
      ownerLastName: 'Trần',
      ownerFirstName: 'Vương',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã phê duyệt các chương trình hỗ trợ nông dân',
      time: '2 tuần trước',
      isRead: true,
   },
   {
      ownerLastName: 'Phan',
      ownerFirstName: 'Thùy',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'đã thực hiện kiểm tra chất lượng nước sinh hoạt',
      time: '5 giờ trước',
      isRead: true,
   },
   {
      ownerLastName: 'Vũ',
      ownerFirstName: 'Nhi',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã triển khai các biện pháp chống ngập lụt',
      time: '4 ngày trước',
      isRead: true,
   },
   {
      ownerLastName: 'Hoàng',
      ownerFirstName: 'Phúc',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'có thông báo quan trọng về chiến lược bảo vệ tài nguyên',
      time: '1 ngày trước',
      isRead: true,
   },
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Thanh',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về quy trình tiếp nhận phản hồi của người dân',
      time: '3 giờ trước',
      isRead: true,
   },
   {
      ownerLastName: 'Lê',
      ownerFirstName: 'Kiều',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã thông báo về chính sách phát triển bền vững',
      time: '4 giờ trước',
      isRead: true,
   },
   {
      ownerLastName: 'Trần',
      ownerFirstName: 'Bích',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã tổ chức hội nghị về các dự án đầu tư mới',
      time: '2 tuần trước',
      isRead: true,
   },
   {
      ownerLastName: 'Phan',
      ownerFirstName: 'Dũng',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về tình hình bảo vệ an ninh trật tự',
      time: '1 tuần trước',
      isRead: true,
   },
   {
      ownerLastName: 'Vũ',
      ownerFirstName: 'Hương',
      role: 'Quản lý Cấp Huyện',
      avatar: null,
      title: 'đã có kế hoạch cải tạo cơ sở hạ tầng khu vực',
      time: '30 phút trước',
      isRead: true,
   },
   {
      ownerLastName: 'Hoàng',
      ownerFirstName: 'Tuấn',
      role: 'Quản lý Cấp Trung Ương',
      avatar: null,
      title: 'đã công nhận các thành tựu trong lĩnh vực công nghệ',
      time: '5 ngày trước',
      isRead: true,
   },
   {
      ownerLastName: 'Nguyễn',
      ownerFirstName: 'Mai',
      role: 'Quản lý Cấp Xã',
      avatar: null,
      title: 'thông báo về kết quả kiểm tra dịch vụ công cộng',
      time: '2 giờ trước',
      isRead: true,
   },
] as NotifyItemProps[];

export function NotifyPopover(): React.JSX.Element {
   const router = useRouter();
   const { user } = useUser();

   const userPopover = usePopover<HTMLDivElement>();

   return (
      <React.Fragment>
         <Tooltip title="Notifications">
            <Box ref={userPopover.anchorRef}>
               <IconButton onClick={userPopover.handleOpen}>
                  <Badge badgeContent={4} color="success">
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
                  {notifyListTest.map((element) => (
                     <NotifyItem
                        ownerFirstName={element.ownerFirstName}
                        ownerLastName={element.ownerLastName}
                        avatar={element.avatar}
                        role={element.role}
                        time={element.time}
                        title={element.title}
                        isRead={element.isRead}
                     />
                  ))}
               </MenuList>
            </Box>
         </Popover>
      </React.Fragment>
   );
}

const NotifyItem: React.FC<NotifyItemProps> = ({
   ownerFirstName,
   ownerLastName,
   role,
   avatar,
   title,
   time,
   isRead,
}) => {
   return (
      <MenuItem sx={{ display: 'flex', gap: 1, alignItems: 'start' }}>
         <Avatar {...stringAvatar(ownerLastName)} style={{ marginTop: '4px' }} />

         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
               sx={{
                  display: 'inline',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  lineHeight: 1.1,
               }}
            >
               <Typography
                  sx={{ fontWeight: 500, display: 'inline' }}
               >{`${ownerFirstName} ${ownerLastName} - ${role} `}</Typography>
               {title}
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

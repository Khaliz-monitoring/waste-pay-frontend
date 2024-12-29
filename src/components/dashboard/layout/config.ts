import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const mangerNavItems = [
   { key: 'overview', title: 'Thống Kê', href: paths.dashboard.overview, icon: 'chart-pie' },
   { key: 'customers', title: 'Hộ Gia Đình', href: paths.dashboard.customers, icon: 'users' },
   // {
   //    key: 'commune-managers',
   //    title: 'Quản Lý Cấp Xã',
   //    href: paths.dashboard.communeManagers,
   //    icon: 'users',
   // },
   // {
   //    key: 'district-managers',
   //    title: 'Quản Lý Cấp Huyện',
   //    href: paths.dashboard.districtManagers,
   //    icon: 'users',
   // },
   { key: 'account', title: 'Tài Khoản', href: paths.dashboard.account, icon: 'user' },

   // { key: 'settings', title: 'Cài Đặt', href: paths.dashboard.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

export const userNavItems = [
   { key: 'account', title: 'Tài Khoản', href: paths.dashboard.account, icon: 'user' },
   { key: 'payment', title: 'Thanh Toán', href: paths.dashboard.payment, icon: 'payment' },

   // { key: 'settings', title: 'Cài Đặt', href: paths.dashboard.settings, icon: 'gear-six' },
] satisfies NavItemConfig[];

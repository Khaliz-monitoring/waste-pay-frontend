import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
   { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
   { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
   { key: 'managers1', title: 'Managers 1', href: paths.dashboard.managers1, icon: 'users' },
   { key: 'managers2', title: 'Managers 2', href: paths.dashboard.managers2, icon: 'users' },
   { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
   { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];

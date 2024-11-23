import { paths } from '@/paths';
import { redirect } from 'next/navigation';

export default function Page(): never {
   redirect(paths.dashboard.account);
}

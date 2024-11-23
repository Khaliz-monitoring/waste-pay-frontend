import { ERole } from '@/enums/role.enum';

export type UserAuth = {
   id: number;
   firstName: string;
   lastName: string;
   fullName: string;
   role: ERole;
   phone: string;
   email: string;
   avatar: string;
   address: string;
};

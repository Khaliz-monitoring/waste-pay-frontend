import { ERole } from '@/enums/role.enum';
import { EUserState } from '@/enums/user-state.enum';

export type UserAuth = {
   id: number;
   firstName?: string;
   lastName?: string;
   fullName: string;
   role: ERole;
   phoneNumber: string;
   email: string;
   password?: string;
   avatar: string;
   address: Address;
   state: EUserState;
};

export type Province = {
   fullName: string;
   code: string;
};

export type District = {
   fullName: string;
   province: Province;
   code: string;
};

export type Ward = {
   fullName: string;
   district: District;
   code: string;
};

export type Address = {
   ward: Ward;
   fullName: string;
   code: string;
};

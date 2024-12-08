export enum EUserState {
   INACTIVE = 'Chưa kích hoạt',
   ACTIVE = 'Hoạt động',
   LOCKED = 'Bị khóa',
}

export const extractEUserState = (name: string): EUserState => {
   return EUserState[name as keyof typeof EUserState];
};

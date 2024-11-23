export enum ERole {
   ADMIN = 'ADMIN',
   DISTRICT = 'DISTRICT',
   COMMNUE = 'COMMNUE',
   USER = 'USER',
}

export const extrackERole = (name: string): ERole => {
   return ERole[name as keyof typeof ERole];
};

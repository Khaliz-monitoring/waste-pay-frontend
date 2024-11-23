export enum ERole {
   ADMIN,
   DISTRICT,
   COMMNUE,
   USER,
}

export const extrackERole = (name: string): ERole => {
   return ERole[name as keyof typeof ERole];
};

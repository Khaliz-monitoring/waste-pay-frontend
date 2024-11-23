export enum EWorkspace {
   Manager = 'Manager',
   User = 'User',
}

export const extrackWorkspace = (name: string): EWorkspace => {
   return EWorkspace[name as keyof typeof EWorkspace];
};

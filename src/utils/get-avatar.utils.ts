import { IMAGE_BASE_URL } from '@/paths/backend';

export const getAvatar = (fileName: string) => {
   return IMAGE_BASE_URL + fileName;
};

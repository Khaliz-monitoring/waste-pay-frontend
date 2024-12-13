export enum EAdministrativeLevel {
   PROVINCE = 'PROVINCE', // Tỉnh/Thành phố
   DISTRICT = 'DISTRICT', // Quận/Huyện
   WARD = 'WARD', // Phường/Xã
   SPECCIFICAL_ADDRESS = 'SPECCIFICAL_ADDRESS',
}

export const extractEAdministrativeLevel = (value: string) =>
   EAdministrativeLevel[value as keyof typeof EAdministrativeLevel];

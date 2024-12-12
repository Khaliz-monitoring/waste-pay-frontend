import { EAdministrativeLevel } from '@/enums/administrativeLevel.enum';

export type FetchAdministrativeLevelActionPayload = {
   administrativeLevel: EAdministrativeLevel;
   parentCode: string;
};

export type ChangeAddressPayload = {
   field: EAdministrativeLevel;
   option: any;
};

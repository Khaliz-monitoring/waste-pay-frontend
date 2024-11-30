import { EUserState } from '@/enums/user-state.enum';

export const templateColor = {
   error: '#d32f2f',
   success: '#2e7d32',
   warning: '#e65100',
};

export const templateColorUserState = {
   [EUserState.LOCKED]: templateColor.error,
   [EUserState.ACTIVE]: templateColor.success,
   [EUserState.INACTIVE]: templateColor.warning,
};

export const getColorByUserState = (state: EUserState) => {
   return templateColorUserState[state];
};

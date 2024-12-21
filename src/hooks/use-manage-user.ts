'use client';

import { ERole } from '@/enums/role.enum';
import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';

/**
 * fetch list user by entity type
 * @returns list user based on role
 */
export const useFetchListUser = () => {
   const dispatch = useAppDispatch();

   const fetchListUserByEntity = (entityType: ERole) => {
      dispatch(manageUserStore.firstFetchAction(entityType));
   };

   return fetchListUserByEntity;
};

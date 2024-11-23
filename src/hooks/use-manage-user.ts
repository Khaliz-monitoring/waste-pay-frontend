'use client';

import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';
import { EntityType } from '@/types/mange-user';

/**
 * fetch list user by entity type
 * @returns list user based on role
 */
export const useFetchListUser = () => {
   const dispatch = useAppDispatch();

   const fetchListUserByEntity = (entityType: EntityType) => {
      dispatch(manageUserStore.firstFetchAction(entityType));
   };

   return fetchListUserByEntity;
};

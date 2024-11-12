'use client';

import * as React from 'react';
import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';
import { useRouter } from 'next/navigation'; // Correct for App Router
import { LOGIN } from '@/paths/frontend';
import { usePathname } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { authStore } from '@/store/slices';

export interface UserContextValue {
   user: User | null;
   error: string | null;
   isLoading: boolean;
   checkSession?: () => Promise<void>;
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
   children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
   const [state, setState] = React.useState<{
      user: User | null;
      error: string | null;
      isLoading: boolean;
   }>({
      user: null,
      error: null,
      isLoading: true,
   });

   const router = useRouter(); // Use the App Router's navigation API
   const pathname = usePathname();

   const checkSession = React.useCallback(async (): Promise<void> => {
      try {
         const { data, error } = await authClient.getUser();
         const dispatch = useAppDispatch();

         if (error && !pathname.includes(LOGIN)) {
            router.push(LOGIN); // Client-side navigation with App Router's API
         }

         if (error) {
            logger.error(error);
            setState((prev) => ({
               ...prev,
               user: null,
               error: 'Something went wrong',
               isLoading: false,
            }));
            return;
         }

         dispatch(authStore.actions.setCurrentUser(data));
      } catch (err) {
         logger.error(err);
         setState((prev) => ({
            ...prev,
            user: null,
            error: 'Something went wrong',
            isLoading: false,
         }));
      }
   }, [router, pathname]);

   React.useEffect(() => {
      checkSession().catch((err) => {
         logger.error(err);
         console.log(err); // Optional: Handle fetch error in console
      });
   }, [checkSession]);

   return (
      <UserContext.Provider value={{ ...state, checkSession }}>{children}</UserContext.Provider>
   );
}

export const UserConsumer = UserContext.Consumer;

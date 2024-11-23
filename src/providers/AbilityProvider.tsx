'use client';

import React, { createContext, useContext, useEffect, useLayoutEffect } from 'react';
import { defineAbilitiesFor } from '@/utils/authorization/abilities';
import { AbilityTuple, PureAbility } from '@casl/ability';
import { usePathname, useRouter } from 'next/navigation';
import { BASE_URL } from '@/paths/frontend';
import { useUser } from '@/hooks/use-user';

const AbilityContext = createContext<PureAbility | null>(null);

export const AbilityProvider = ({ children }) => {
   const router = useRouter();
   const { user } = useUser();
   const pathname = usePathname();

   const ability = defineAbilitiesFor(user) as PureAbility<AbilityTuple, unknown>;

   // get path without process.env.NEXT_PUBLIC_FRONTEND_URL
   //const subPath = pathname.substring(BASE_URL.length + 1);

   // console.log('subpath', subPath);

   // useLayoutEffect(() => {
   //    if (!ability.can('view', pathname) && pathname !== '/403') {
   //       console.log('khong co quiyen', pathname);
   //       console.log(ability);
   //       router.replace('/403');
   //    }
   // }, [ability, router]);

   return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

export const useAbility = () => useContext(AbilityContext);

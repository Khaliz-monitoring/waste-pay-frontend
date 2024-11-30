import type { Viewport } from 'next';
import * as React from 'react';
import i18next from 'i18next';
// import '@/i18n/locales/config';

import '@/styles/global.css';
import '@/theme/_global.css';

import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { UserProvider } from '@/contexts/user-context';
import StoreProvider from '@/store/StoreProvider';
import AppMessagePopup from '@/components/MessagePopup';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
   children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
   // i18next.changeLanguage('vn');
   return (
      <html lang="en">
         <body>
            <LocalizationProvider>
               <StoreProvider>
                  <AppMessagePopup />
                  <UserProvider>
                     <ThemeProvider>{children}</ThemeProvider>
                  </UserProvider>
               </StoreProvider>
            </LocalizationProvider>
         </body>
      </html>
   );
}

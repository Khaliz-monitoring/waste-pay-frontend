import { BASE_URL } from './paths/frontend';

export const paths = {
   home: '/',
   auth: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      resetPassword: '/auth/reset-password',
   },
   dashboard: {
      overview: `${BASE_URL}/dashboard`,
      account: `${BASE_URL}/dashboard/account`,
      customers: `${BASE_URL}/dashboard/customers`,
      communeManagers: `${BASE_URL}/dashboard/commune-managers`,
      districtManagers: `${BASE_URL}/dashboard/district-managers`,
      integrations: `${BASE_URL}/dashboard/integrations`,
      settings: `${BASE_URL}/dashboard/settings`,
      payment: `${BASE_URL}/dashboard/payment`,
   },
   errors: { notFound: '/errors/not-found' },
} as const;

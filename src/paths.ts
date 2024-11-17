export const paths = {
   home: '/',
   auth: {
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      resetPassword: '/auth/reset-password',
   },
   dashboard: {
      overview: '/dashboard',
      account: '/dashboard/account',
      customers: '/dashboard/customers',
      communeManagers: '/dashboard/commune-managers',
      districtManagers: '/dashboard/district-managers',
      integrations: '/dashboard/integrations',
      settings: '/dashboard/settings',
      payment: '/dashboard/payment',
   },
   errors: { notFound: '/errors/not-found' },
} as const;

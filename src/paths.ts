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
      managers1: '/dashboard/managers1',
      managers2: '/dashboard/managers2',
      integrations: '/dashboard/integrations',
      settings: '/dashboard/settings',
   },
   errors: { notFound: '/errors/not-found' },
} as const;

import authApi from '@/api/auth.api';
import { extrackERole } from '@/enums/role.enum';
import { UserAuth } from '@/types/auth';

import axios from 'axios';
import nookies, { setCookie } from 'nookies';

function generateToken(): string {
   const arr = new Uint8Array(12);
   window.crypto.getRandomValues(arr);
   return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

export interface SignUpParams {
   firstName: string;
   lastName: string;
   email: string;
   password: string;
}

export interface SignInWithOAuthParams {
   provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
   email: string;
   password: string;
}

export interface ResetPasswordParams {
   email: string;
}

class AuthClient {
   async signUp(_: SignUpParams): Promise<{ error?: string }> {
      // Make API request

      // We do not handle the API, so we'll just generate a token and store it in localStorage.
      const token = generateToken();
      localStorage.setItem('custom-auth-token', token);

      return {};
   }

   async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
      return { error: 'Social authentication not implemented' };
   }

   async signInWithPassword(
      params: SignInWithPasswordParams
   ): Promise<{ error?: string; accessToken?: string }> {
      const { email, password } = params;

      const transformData = {
         email,
         password,
      };

      const options = {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
         },
         auth: {
            username: 'client',
            password: 'password',
         },
      };
      try {
         const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/authenticate`,
            transformData,
            options
         );

         const data = res?.data;

         const accessToken = data.access_token;
         // const refreshToken = data.refresh_token;
         // const name = data.name;
         // const role = data.role;
         // const defaultLocale = data.defaultLocale;
         // const userId = data.id;

         setCookie(null, 'access_token', accessToken, {
            maxAge: 604800,
            path: '/',
         });

         // // save refresh_token in cookies
         // setCookie(null, 'refresh_token', refreshToken, {
         //    maxAge: 604800,
         //    path: '/',
         // });

         // setCookie(null, 'role', role, { maxAge: 604800, path: '/' });
         // setCookie(null, 'name', name, { maxAge: 604800, path: '/' });
         // localStorage.setItem('name', name);
         // setCookie(null, 'defaultLocale', defaultLocale, { maxAge: 604800, path: '/' });
         // setCookie(null, 'id', userId, { maxAge: 604800, path: '/' });

         return { accessToken };
      } catch (error) {
         console.log(error);
         return { error: 'Username or password is incorrect' };
      }
   }

   async resetPassword(data: ResetPasswordParams): Promise<{ error?: string }> {
      console.log(data);
      return { error: 'Password reset not implemented' };
   }

   async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
      return { error: 'Update reset not implemented' };
   }

   async getUser(): Promise<{ data?: UserAuth | null; error?: string }> {
      try {
         const { data } = await authApi.retrieveAuthenticatedUserInfo();

         const userInfo = {
            firstName: data.firstname,
            lastName: data.lastname,
            fullName: data.fullName,
            phone: data.phoneNumber,
            avatar: data.avatar,
            //address: data.address,
            role: extrackERole(data.role),
            email: data.email,
         } as UserAuth;

         return { data: userInfo };
      } catch (error) {
         //return { error: 'Failed to authenticate user' };
         return { data: null };
      }
   }

   async signOut(): Promise<{ error?: string }> {
      // localStorage.removeItem('custom-auth-token');
      removeAllCookies();

      return {};
   }
}

const removeAllCookies = () => {
   const cookies = nookies.get();
   Object.keys(cookies).forEach((cookieName) => {
      nookies.destroy(null, cookieName, { path: '/' });
   });
};

export const authClient = new AuthClient();

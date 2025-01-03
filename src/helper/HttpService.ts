import type { AxiosError, AxiosInstance, ResponseType } from 'axios';
import axios from 'axios';
import type { GetServerSidePropsContext } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { plural } from 'pluralize';

class HttpService<GetList = any> {
   protected instance: AxiosInstance;

   protected entity: string;

   constructor(entity: string) {
      this.entity = plural(entity);
      axios.defaults.withCredentials = true;
      this.instance = axios.create({
         baseURL: process.env.NEXT_PUBLIC_API_BACKEND,
      });
      this.instance.interceptors.response.use(this.handleSuccessRes, this.handleErrorRes);
   }

   private handleSuccessRes({ data, status }): any {
      if (typeof data === 'string') {
         data = JSON.parse(data);
      }

      return { data, status };
   }

   private async handleErrorRes(error: AxiosError) {
      let formatError = {};
      if (error?.response) {
         const { data, status } = error.response;
         const isServer = typeof window === 'undefined';
         switch (status) {
            // case 401:
            //    if (!isServer) {
            //       const cookies = parseCookies();
            //       const refresh_token = cookies['refresh_token'];

            //       try {
            //          const response = await axios.post(
            //             `${process.env.NEXT_PUBLIC_BACKEND_URL}oauth/refreshToken`,
            //             {
            //                refreshToken: refresh_token,
            //             }
            //          );
            //          const accessToken = response.data.data.accessToken;
            //          setCookie(null, 'token', accessToken, {
            //             maxAge: 604800,
            //             path: '/',
            //          });
            //          const newRequest = {
            //             ...error.config,
            //             headers: {
            //                ...error?.config?.headers,
            //                Authorization: 'Bearer ' + accessToken,
            //             },
            //          };
            //          if (newRequest.url?.includes('import')) {
            //             newRequest.headers['Content-Type'] = 'multipart/form-data';
            //          }
            //          return await axios(newRequest);
            //       } catch (error) {
            //          if (error.response.status == 400 || error.response.status == 404) {
            //             // BAD request
            //             formatError = {
            //                status: error.response.status,
            //                message: error.response.data.message,
            //             };
            //             return Promise.reject(formatError);
            //          } else if (error.response.status == 500) {
            //             Router.push('/500');
            //          } else {
            //             Router.push('/login');
            //             return;
            //          }
            //       }
            //    }
            //    break;
            case 503:
               if (!isServer) Router.replace('/maintenance');
               break;
            default:
               break;
         }

         const { message, ...restData } = typeof data === 'string' ? JSON.parse(data) : data;

         formatError = { message, status, ...restData };

         console.log('from response error: ', formatError);
      }
      // Aborted request case
      if (error?.code === 'ECONNABORTED') {
         formatError = { message: 'Request aborted', status: 'canceled' };
      }
      // For dev only
      if (process.env.NEXT_PUBLIC_MODE === 'develop') {
         console.log('error', '>>>', error);
         console.log('error to JSON', '>>>', error.toJSON());
      }
      return Promise.reject(formatError);
   }

   protected saveToken = (context: GetServerSidePropsContext = null as any) => {
      const cookies = parseCookies(context);
      const accessToken = cookies['access_token'];

      const locale = cookies['defaultLocale'] || 'en';

      this.instance.defaults.headers.common = {
         Authorization: `Bearer ${accessToken}`,
         'Content-Type': 'application/json',
         locale: locale,
      };
   };

   protected setHeaderForApiTransferFile = (context: GetServerSidePropsContext = null as any) => {
      const cookies = parseCookies(context);
      const accessToken = cookies['access_token'];
      const locale = cookies['defaultLocale'];
      // Set token if had
      if (accessToken) {
         this.instance.defaults.headers.common = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
            locale: locale,
         };
      } else {
         delete this.instance.defaults.headers.Authorization;
      }
   };

   get = <T = any>(
      endpoint: string,
      params = {} as Record<string, any>,
      context: GetServerSidePropsContext = null,
      responseType = 'default' as ResponseType
   ) => {
      this.saveToken(context);
      return this.instance.get<T>(endpoint, { params, responseType });
   };

   getList = (params = {} as Record<string, any>, context: GetServerSidePropsContext = null) =>
      this.get<GetList>(this.entity, params, context);

   post = <T = any>(
      endpoint: string,
      data = {} as Record<string, any>,
      params = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any
   ) => {
      this.saveToken(context);
      return this.instance.post<T>(endpoint, data, { params });
   };

   importData = <T = any>(
      endpoint: string,
      data = {} as Record<string, any>,
      params = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any
   ) => {
      this.setHeaderForApiTransferFile(context);
      return this.instance.post<T>(endpoint, data, { params });
   };

   getListData = <T = any>(
      data = {} as Record<string, any>,
      params = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any,
      responseType = 'default' as ResponseType
   ) => {
      this.saveToken(context);
      return this.instance.post<T>(this.entity, data, { params, responseType });
   };

   getDataList = <T = any>(
      endpoint: string,
      params = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any,
      responseType = 'default' as ResponseType
   ) => {
      this.saveToken(context);
      return this.instance.get<T>(endpoint, { params, responseType });
   };

   put = <T = any>(
      endpoint: string,
      params = {} as Record<string, any>,
      data = {} as Record<string, any>,
      context: GetServerSidePropsContext = null
   ) => {
      this.saveToken(context);
      return this.instance.put<T>(endpoint, data, { params });
   };

   updateFile = <T = any>(
      endpoint: string,
      data = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any
   ) => {
      this.setHeaderForApiTransferFile(context);
      return this.instance.put<T>(endpoint, data);
   };

   delete = <T = any>(
      endpoint: string,
      data = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any
   ) => {
      this.saveToken(context);
      return this.instance.delete<T>(endpoint, { data: data });
   };

   createNewProduct = <T = any>(
      endpoint: string,
      data = {} as Record<string, any>,
      context: GetServerSidePropsContext = null as any
   ) => {
      this.setHeaderForApiTransferFile(context);
      return this.instance.post<T>(endpoint, data);
   };
}

export default HttpService;

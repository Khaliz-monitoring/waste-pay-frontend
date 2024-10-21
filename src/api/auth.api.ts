import HttpService from '@/helper/HttpService';

class AuthApi extends HttpService {
   forgotPassword = (data: any) => {
      return this.post<any>(`/users/forgotPassword`, { ...data });
   };
   resetPassword = (data: any) => {
      return this.post<any>(`/oauth/resetPassword`, { ...data });
   };

   logOut = () => {
      return this.post<any>('/oauth/revokeAccessToken', {});
   };

   checkToken = () => {
      return this.post<any>('/oauth/checkToken');
   };
}

const authApi = new AuthApi('');

export default authApi;

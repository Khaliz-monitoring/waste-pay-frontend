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

   retrieveAuthenticatedUserInfo = () => {
      return this.get<any>('/auth/retrieve-authenticated-user-info');
   };
}

const authApi = new AuthApi('');

export default authApi;

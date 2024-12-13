import HttpService from '@/helper/HttpService';
import { UserAuth } from '@/types/auth';

class AccountApi extends HttpService {
   updateUserInfo = (userInfo: UserAuth) => {
      return this.put<any>('/users/update-user-info', null, userInfo);
   };
}

const accountApi = new AccountApi('Account');

export default accountApi;

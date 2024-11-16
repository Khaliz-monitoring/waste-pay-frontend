import { API_VERSION_V1 } from '@/constants/api-version';
import HttpService from '@/helper/HttpService';

class ManageUserApi extends HttpService {
   getListUserByFilter = (filter: any) => {
      return this.get<any>(`management/get-users-by-manager`, filter);
   };
}

const manageUserApi = new ManageUserApi('Manage User');

export default manageUserApi;

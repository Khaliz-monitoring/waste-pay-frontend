import HttpService from '@/helper/HttpService';
import { AddUserProps } from '@/types/mange-user';

class ManageUserApi extends HttpService {
   getListUserByFilter = (filter: any) => {
      return this.get<any>(`management/get-users-by-manager`, filter);
   };

   addUser = (data: AddUserProps) => {
      return this.get<any>(`management/add-user`, data);
   };
}

const manageUserApi = new ManageUserApi('Manage User');

export default manageUserApi;

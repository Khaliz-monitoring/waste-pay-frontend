import HttpService from '@/helper/HttpService';
import { FetchAdministrativeLevelActionPayload } from '@/types/administrativeLevel';

class AdministrativeLevelApi extends HttpService {
   fetchHierarchyByLevel = (data: FetchAdministrativeLevelActionPayload) => {
      return this.get<any>('/administrative-level/get-administrative-level-list', data);
   };
}

const administrativeLevelApi = new AdministrativeLevelApi('AdministrativeLevel');

export default administrativeLevelApi;

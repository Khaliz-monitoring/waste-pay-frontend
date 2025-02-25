import HttpService from '@/helper/HttpService';

class StatisticalApi extends HttpService {
   retrieveChartData = (data: any) => {
      return this.get<any>('/statistical/retrieve-chart-data', data);
   };

   retrieveSummaryData = () => {
      return this.get<any>('/statistical/retrieve-summary-data');
   };
}

const statisticalApi = new StatisticalApi('Statistical');

export default statisticalApi;

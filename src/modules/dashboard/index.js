import DashboardController from './dashboard.controller';
import DashboardRoutes from './dashboard.routes';

export default angular.module(`Dnland.Dashboard`, [])
  .config(DashboardRoutes.getInstance)
  .controller('DashboardController', DashboardController).name;

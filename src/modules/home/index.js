import HomeRoutes from './home.routes';
import HomeController from './home.controller';

export default angular.module(`${APP_NAME}.Home`, [])
  .config(HomeRoutes.getInstance)
  .controller('HomeController', HomeController)
  .name;

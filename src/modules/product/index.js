import ProductRoutes from './product.routes';
import ProductController from './product.controller';

export default angular.module(`${APP_NAME}.Product`, [])
  .config(ProductRoutes.getInstance)
  .controller('ProductController', ProductController)
  .name;

export default class ConfigRoute {

  static $inject = ['$stateProvider'];
  static instance;

  static getInstance($stateProvider) {
    if (!ConfigRoute.instance) {
      ConfigRoute.instance = new ConfigRoute($stateProvider);
    }
    return ConfigRoute.instance;
  }

  constructor($stateProvider) {
    $stateProvider
      .state('dashboard.product', {
        url: 'product',
        views: {
          'dashboard': {
            templateUrl: 'modules/product/product.html',
            controller: 'ProductController',
            controllerAs: 'ProductCtrl'
          }
        }
      });
  }
}

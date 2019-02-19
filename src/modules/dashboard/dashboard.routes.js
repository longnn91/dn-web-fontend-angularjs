export default class ConfigRoutes {

  static $inject = ['$stateProvider'];
  static instance;

  static getInstance($stateProvider) {
    if (!ConfigRoutes.instance) {
      ConfigRoutes.instance = new ConfigRoutes($stateProvider);
    }
    return ConfigRoutes.instance;
  }

  constructor($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        abstract: true,
        templateUrl: 'modules/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'DashboardCtrl'
      });
  }
}

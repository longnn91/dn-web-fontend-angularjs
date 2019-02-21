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
    .state('home', {
      url: '/',
      templateUrl: 'modules/home/home.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl'
    })
    .state('dashboard', {
      url: '/',
      abstract: true,
      templateUrl: 'modules/home/home.html',
      controller: 'HomeController',
      controllerAs: 'HomeCtrl'
    });
  }
}

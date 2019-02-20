class AppRouter {

  static $inject = ['$urlRouterProvider', '$locationProvider'];
  static instance;

  static getInstance($urlRouterProvider, $locationProvider) {
    if (!AppRouter.instance) {
      AppRouter.instance = new AppRouter($urlRouterProvider, $locationProvider);
    }
    return AppRouter.instance;
  }

  constructor($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }
}

export default angular.module(`${APP_NAME}.router`, []).config(AppRouter.getInstance).name;

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home'
    });
}

import angular from 'angular';
import 'angular-ui-router';
import './styles/main.scss';
import 'modules';

let mainController = ($scope) => {
  $scope.title = 'Welcome to angularjs world...';
};

class aboutController {
  constructor() {
    this.name = 'This is About section';
  }
}

class helloControllder {
  constructor() {
    this.name = 'This is Hello section'
  }
}

angular.module('childModule', [])
.controller('mainController', mainController)
.controller('aboutController', aboutController)
.controller('helloControllder', helloControllder)
.config(($stateProvider) => {
  let helloState = {
    name: 'about',
    url: '/about',
    templateUrl: 'modules/about.html',
    controller: 'aboutController',
    controllerAs: 'aboutCtrl'
  }
  let aboutState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>{{ helloCtrl.name }}</h3>',
    controller: 'helloControllder',
    controllerAs: 'helloCtrl'
  }
  $stateProvider
  .state(helloState)
  .state(aboutState);
});

angular.module('Dnland',[
  'ui.router',
  'childModule',
  'Dnland.modules'
]);

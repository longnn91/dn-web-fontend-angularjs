export default class DashboardController {

  static $inject = ['$state', '$scope'];

  constructor($state, $scope) {
    $scope.$on('$viewContentLoaded', () => {
      this.isHideToolbar = $state.current.name === 'calling-top.home';
    });
  }
}

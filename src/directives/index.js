import OnErrorSourceDirective from './on-error-src.directive';

export default angular.module(`${APP_NAME}.directives`, [])
  .directive('onErrorSrc', OnErrorSourceDirective.getInstance).name;

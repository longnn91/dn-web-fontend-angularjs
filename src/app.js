import angular from 'angular';
import 'angular-ui-router';
import 'angular-translate';
import 'configs/app.config';
import 'configs/app.router';
import 'modules';
import 'services';

angular.module(APP_NAME, [
  'ui.router',
  'pascalprecht.translate',
  `${APP_NAME}.config`,
  `${APP_NAME}.router`,
  `${APP_NAME}.services`,
  `${APP_NAME}.modules`
]);

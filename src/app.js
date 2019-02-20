import angular from 'angular';
import 'styles/main.scss';
import 'angular-cookies';
import 'angular-ui-router';
import 'angular-translate';
import 'configs/app.config';
import 'configs/app.router';
import 'modules';
import 'services';
import 'components';

angular.module(APP_NAME, [
  'ui.router',
  'ngCookies',
  'pascalprecht.translate',
  `${APP_NAME}.config`,
  `${APP_NAME}.router`,
  `${APP_NAME}.services`,
  `${APP_NAME}.modules`,
  `${APP_NAME}.components`
]);

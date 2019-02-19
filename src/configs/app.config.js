import langEn from 'i18n/en.json';
import langJa from 'i18n/ja.json';

class AppConfig {

  static $inject = ['$httpProvider', 'laddaProvider', '$translateProvider', 'toastrConfig', 'localStorageServiceProvider'];
  static instance;

  static getInstance($httpProvider, laddaProvider, $translateProvider, toastrConfig, localStorageServiceProvider) {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig($httpProvider, laddaProvider, $translateProvider, toastrConfig, localStorageServiceProvider);
    }
    return AppConfig.instance;
  }
  constructor($httpProvider, laddaProvider, $translateProvider, toastrConfig, localStorageServiceProvider) {
    $httpProvider.interceptors.push('HttpInterceptorService');
    laddaProvider.setOption({
      style: 'expand-left'
    });
    localStorageServiceProvider.setDefaultToCookie(false);
    localStorageServiceProvider.setStorageType('sessionStorage');
    localStorageServiceProvider.setPrefix('calling-platform');
    $translateProvider.translations('ja', langJa);
    $translateProvider.translations('en', langEn);
    $translateProvider.preferredLanguage('ja');
    $translateProvider.useSanitizeValueStrategy('escape');
    angular.extend(toastrConfig, {
      preventOpenDuplicates: true,
      positionClass: 'toast-top-center'
    });
  }
}

export default angular.module(`${APP_NAME}.config`, []).config(AppConfig.getInstance).name;

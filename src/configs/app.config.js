import langEn from 'i18n/en.json';
import langVi from 'i18n/vi.json';

class AppConfig {

  static $inject = ['$httpProvider', '$translateProvider'];
  static instance;

  static getInstance($httpProvider, $translateProvider) {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig($httpProvider, $translateProvider)
    }
    return AppConfig.instance;
  }

  constructor($httpProvider, $translateProvider) {
    this.$httpProvider = $httpProvider;
    $httpProvider.interceptors.push('HttpInterceptorService');
    $translateProvider.translations('vi', langVi);
    $translateProvider.translations('en', langEn);
    $translateProvider.preferredLanguage('vi');
  }
}

export default angular.module(`${APP_NAME}.config`, []).config(AppConfig.getInstance).name;

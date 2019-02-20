import langEn from 'i18n/en.json';
import langVi from 'i18n/vi.json';

class AppConfig {

  static $inject = ['$translateProvider'];
  static instance;

  static getInstance($translateProvider) {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig($translateProvider)
    }
    return AppConfig.instance;
  }

  constructor($translateProvider) {
    $translateProvider.translations('vi', langVi);
    $translateProvider.translations('en', langEn);
    $translateProvider.preferredLanguage('vi');
  }
}

export default angular.module(`${APP_NAME}.config`, []).config(AppConfig.getInstance).name;

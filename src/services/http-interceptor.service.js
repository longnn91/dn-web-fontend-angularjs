'use strict';

export default class HttpInterceptorService {

  static $inject = ['$q', '$rootScope', 'SecurityService', 'StoreService'];
  static instance;

  static getInstance($q, $rootScope, SecurityService, StoreService) {
    if (!HttpInterceptorService.instance) {
      HttpInterceptorService.instance = new HttpInterceptorService($q, $rootScope, SecurityService, StoreService);
    }
    return HttpInterceptorService.instance.get();
  }

  constructor($q, $rootScope, SecurityService, StoreService) {
    this.$q = $q;
    this.$rootScope = $rootScope;
    this.SecurityService = SecurityService;
    this.StoreService = StoreService;
  }

  request(config) {
    const currentLanguage = angular.getCurrentLanguage(this.StoreService.get('currentLanguage'));
    if (this.SecurityService.isAuthenticated() && config.url.indexOf(API_URL) === 0) {
      config.headers.Authorization = 'Bearer ' + this.SecurityService.getAccessToken();
    }
    if (this.SecurityService.isActiveDirectoryVerify() && config.url.indexOf(API_URL) === 0) {
      config.headers.Authorization = 'Bearer ' + this.SecurityService.getAccessToken();
    }
    if (config.url.indexOf(API_URL) === 0) {
      config.headers['Language'] = currentLanguage;
    }
    return config || this.$q.when(config);
  }

  requestError(rejection) {
    return rejection;
  }

  response(data) {
    return data;
  }

  responseError(rejection) {
    const statusCode = rejection.status;
    switch (statusCode) {
      case 401:
        this.$rootScope.$broadcast('Error401');
        break;
      case 403:
        this.$rootScope.$broadcast('Error403');
        break;
      case 404:
        this.$rootScope.$broadcast('Error404');
        break;
      case 500:
        this.$rootScope.$broadcast('Error500');
        break;
      default:
        break;
    }
    return statusCode === 200 || statusCode === 201 ? rejection : this.$q.reject(rejection);
  }

  get() {
    return {
      request: this.request.bind(this),
      requestError: this.requestError.bind(this),
      response: this.response.bind(this),
      responseError: this.responseError.bind(this)
    };
  }
}

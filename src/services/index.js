import RandomNameService from './random-name.service';
import AuthService from './auth.service';
import HttpInterceptorService from './http-interceptor.service';
import SecurityService from './security.service';
import StoreService from './store.service';

export default angular.module(`${APP_NAME}.services`, [])
.service('AuthService', AuthService)
.service('RandomNameService', RandomNameService)
.service('SecurityService', SecurityService)
.service('StoreService', StoreService)
.service('HttpInterceptorService', HttpInterceptorService).name;

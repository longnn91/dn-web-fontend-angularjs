import HeaderComponent from './header';
import LoginComponent from './login';

export default angular.module(`${APP_NAME}.components`, [])
.component('loginComponent', LoginComponent)
.component('headerComponent', HeaderComponent).name;

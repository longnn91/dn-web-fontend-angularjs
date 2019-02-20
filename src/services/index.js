import RandomNameService from './random-name.service';

export default angular.module(`${APP_NAME}.services`, [])
.service('RandomNameService', RandomNameService).name;

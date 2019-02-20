import BaseService from 'base/base.service';

export default class RandomNameService extends BaseService {

  static $inject = ['$http', '$q']
  constructor($http, $q) {
    super($http, $q);
  }

  login(data) {
    return this.post('auth/login', data);
  }
}

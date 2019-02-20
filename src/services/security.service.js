'use strict';

export default class SecurityService {

  static $inject = ['$cookieStore'];

  constructor($cookieStore) {
    this.$cookieStore = $cookieStore;
  }

  setUserInfo(userInfo) {
    this.$cookieStore.put('userInfo', userInfo);
  }

  getUserInfo() {
    return this.$cookieStore.get('userInfo');
  }

  setAccessToken(token) {
    this.$cookieStore.put('token', token);
  }

  getAccessToken() {
    return this.$cookieStore.get('token');
  }

  isAuthenticated() {
    return angular.isDefined(this.$cookieStore.get('userInfo')) && this.$cookieStore.get('token') !== null;
  }

  isActiveDirectoryVerify() {
    return this.$cookieStore.get('request_id') && this.$cookieStore.get('token');
  }

  removeRequestActiveDirectory() {
    this.$cookieStore.remove('request_id');
  }

  setRequestActiveDirectory(id) {
    this.$cookieStore.put('request_id', id);
  }

  revokeUser() {
    this.$cookieStore.remove('token');
    this.$cookieStore.remove('userInfo');
    this.$cookieStore.remove('csrf_token');
  }
}

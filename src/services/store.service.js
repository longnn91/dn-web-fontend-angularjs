'use strict';

export default class StoreService {

  static $inject = ['localStorageService'];
  static instance;

  constructor(localStorageService) {
    this.localStorageService = localStorageService;
  }

  set(key, value) {
    this.localStorageService.set(key, value);
  }

  get(key) {
    return this.localStorageService.get(key);
  }

  remove(key) {
    this.localStorageService.remove(key);
  }

  removeAll() {
    this.localStorageService.clearAll();
  }
}

export default class BaseService {
  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    this.requestUrl = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  post(url, data) {
    let deferred = this.$q.defer();
    let requestUrl = this.requestUrl + url;
    this.$http.post(requestUrl, data, { headers: this.headers }).success((response) => {
      deferred.resolve(response);
    }).error((error) => {
      error && deferred.reject(error);
    });
    return deferred.promise;
  }

  get(url, params) {
    let deferred = this.$q.defer();
    let requestUrl = this.requestUrl + url;
    let requestParams = params ? { params: params, headers: this.headers } : { headers: this.headers };
    this.$http.get(requestUrl, requestParams).success((response) => {
      deferred.resolve(response);
    }).error((error) => {
      error && deferred.reject(error);
    });
    return deferred.promise;
  }

  put(url, data) {
    let deferred = this.$q.defer();
    let requestUrl = this.requestUrl + url;
    this.$http.put(requestUrl, data, { headers: this.headers }).success((response, status) => {
      if (!response) {
        response = {};
      }
      response.status = status;
      deferred.resolve(response);
    }).error((error) => {
      error && deferred.reject(error);
    });
    return deferred.promise;
  }

  patch(url, data) {
    let deferred = this.$q.defer();
    let requestUrl = this.requestUrl + url;
    this.$http.patch(requestUrl, data, { headers: this.headers }).success((response) => {
      deferred.resolve(response);
    }).error((error) => {
      error && deferred.reject(error);
    });
    return deferred.promise;
  }

  delete(url, params) {
    let deferred = this.$q.defer();
    let requestUrl = this.requestUrl + url;
    let requestParams = params ? { params: params, headers: this.headers } : { headers: this.headers };
    this.$http.delete(requestUrl, requestParams).success((response) => {
      deferred.resolve(response);
    }).error((error) => {
      error && deferred.reject(error);
    });
    return deferred.promise;
  }

  setHeaders(headers) {
    this.headers = { ...this.headers, headers };
  }
}

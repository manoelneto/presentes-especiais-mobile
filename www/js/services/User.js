app.service('User', [
  '$http', 'API', function($http, API) {
    this.sign_in = function(params) {
      return $http.post(API.base + "/users/sign_in.json", {
        user: params
      });
    };
    return this;
  }
]);

app.service('User', [
  '$http', 'API', function($http, API) {
    this.fbResponse = null;
    this.signIn = function(params) {
      return $http.post(API.base + "/users/sign_in.json", {
        user: params
      });
    };
    this.create = function(params) {
      return $http.post(API.base + "/users.json", {
        user: params
      });
    };
    this.hasEmail = function(email) {
      return $http.get(API.base + "/users/has_email.json", {
        params: {
          email: email
        }
      });
    };
    this.loginWithFbToken = function(token) {
      return $http.get(API.system_base + "/users/auth/facebook_access_token/callback?format=json&access_token=" + token);
    };
    return this;
  }
]);

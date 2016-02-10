app.service('User', [
  '$http', 'API', function($http, API) {
    this.fbResponse = null;
    this.current_user = {
      email: "contato@manoelneto.com",
      id: 2,
      spree_api_key: "d079984189df9a9221faa50915a0cd8164e93ae8fecbb596"
    };
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

app.service('FB', [
  '$http', function($http) {
    var FB_GRAPH_BASE;
    FB_GRAPH_BASE = 'https://graph.facebook.com/v2.4';
    this.me = function() {
      return $http.get(FB_GRAPH_BASE + "/me", {
        params: {
          access_token: this.accessToken,
          fields: 'picture.type(large),first_name,last_name,middle_name,email'
        }
      }).then(function(response) {
        return response.data;
      });
    };
    return this;
  }
]);

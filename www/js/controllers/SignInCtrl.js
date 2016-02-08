app.controller('SignInCtrl', [
  '$scope', '$state', 'User', 'FB', '$openFB', function($scope, $state, User, FB, $openFB) {
    $scope.UserService = User;
    $scope.user = {};
    $scope.login = function() {
      $scope.login_error = null;
      return User.signIn($scope.user).then(function(response) {
        User.current_user = response.data;
        return alert("Login realizado com sucesso, token -> " + response.data.spree_api_key);
      })["catch"](function(response) {
        return $scope.login_error = "Credenciais Inválidas";
      });
    };
    return $scope.facebookLogin = function() {
      var loginPromise;
      loginPromise = $openFB.login({
        scope: 'email'
      });
      return loginPromise.then(function(accessToken) {
        FB.accessToken = accessToken;
        return User.loginWithFbToken(accessToken).then(function(response) {
          return User.current_user = response.data;
        })["catch"](function(response) {
          return FB.me().then(function(response) {
            User.fbResponse = response;
            return $state.go('registration_new');
          })["catch"](function(response) {});
        })["catch"](function(response) {});
      });
    };
  }
]);

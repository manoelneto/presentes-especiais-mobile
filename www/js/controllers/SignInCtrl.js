app.controller('SignInCtrl', [
  '$scope', '$state', 'User', 'FB', '$openFB', function($scope, $state, User, FB, $openFB) {
    $scope.UserService = User;
    $scope.user = {};
    $scope.loading = false;
    $scope.login = function() {
      $scope.loading = true;
      $scope.login_error = null;
      return User.signIn($scope.user).then(function(response) {
        User.current_user = response.data;
        return $state.go("products_index");
      })["catch"](function(response) {
        return $scope.login_error = "Credenciais Inválidas";
      })["finally"](function() {
        return $scope.loading = false;
      });
    };
    return $scope.facebookLogin = function() {
      var loginPromise;
      $scope.loading = true;
      loginPromise = $openFB.login({
        scope: 'email'
      });
      return loginPromise.then(function(accessToken) {
        FB.accessToken = accessToken;
        return User.loginWithFbToken(accessToken).then(function(response) {
          User.current_user = response.data;
          return $state.go("products_index");
        })["catch"](function(response) {
          return FB.me().then(function(response) {
            User.fbResponse = response;
            return $state.go('registration_new');
          })["catch"](function(response) {
            return alert("Houve um erro ao pegar dados do facebook");
          })["finally"](function() {
            return $scope.loading = false;
          });
        })["finally"](function() {
          return $scope.loading = false;
        });
      })["catch"](function(response) {
        return $scope.loading = false;
      });
    };
  }
]);

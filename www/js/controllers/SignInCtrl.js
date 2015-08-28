app.controller('SignInCtrl', [
  '$scope', '$state', 'User', function($scope, $state, User) {
    $scope.user = {
      email: 'contato@manoelneto.com',
      password: '12345678'
    };
    return $scope.login = function() {
      $scope.login_error = null;
      return User.sign_in($scope.user).then(function(response) {
        return User.current_user = response.data;
      })["catch"](function(response) {
        return $scope.login_error = "Credenciais Inválidas";
      });
    };
  }
]);

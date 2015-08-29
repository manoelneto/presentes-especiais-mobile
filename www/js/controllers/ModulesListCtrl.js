app.controller('ModulesListCtrl', [
  '$scope', '$state', 'User', function($scope, $state, User) {
    return $scope.logout = function() {
      User.current_user = null;
      return $state.go('index');
    };
  }
]);

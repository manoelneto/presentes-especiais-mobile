app.directive('menuToggleRightButton', [
  'User', '$state', function(User, $state) {
    return {
      templateUrl: 'templates/directives/menu-toggle-right-button.html',
      link: function(scope, el, attrs) {
        return scope.logout = function() {
          User.current_user = null;
          return $state.go('login');
        };
      }
    };
  }
]);

angular.module('starter', ['ionic', 'ui.router']).controller('Login', function($scope, $state) {
  return $scope.Logar = function() {
    return window.location.href = 'http://localhost:8100/#/templates/menu.html';
  };
});

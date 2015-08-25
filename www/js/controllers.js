angular.module('starter', ['ionic', 'ui.router'])

//controllers
.controller('Login', function($scope, $state) {
  $scope.Logar = function(){
    window.location.href = "http://localhost:8100/#/templates/menu.html";  
    // $state.go("help");
 };
})
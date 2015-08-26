angular.module('starter', [
  'ionic'
  'ui.router'
]).controller 'Login', ($scope, $state) ->

  $scope.Logar = ->
    window.location.href = 'http://localhost:8100/#/templates/menu.html'
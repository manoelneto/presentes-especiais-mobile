angular.module('starter', ['ionic', 'ui.router']).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).controller('SignInCtrl', function($scope, $state) {
  $scope.signIn = function(user) {
    if (user !== null) {
      console.log('Sign-In', user);
      return $state.go('list-view');
    } else {
      return alert('Preencha os campos');
    }
  };
  return $scope.createAccount = function() {
    return $state.go('create-account');
  };
}).controller('ListViewCtrl', function($scope) {
  return console.log('ListViewCtrl');
}).controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log($scope, $ionicSideMenuDelegate);
  return $scope.toggleLeft = function() {
    return $ionicSideMenuDelegate.toggleLeft();
  };
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('index', {
    url: '',
    templateUrl: 'index.html',
    controller: 'SignInCtrl'
  });
  $stateProvider.state('list-view', {
    url: '/index',
    templateUrl: 'templates/list-view.html'
  });
  $stateProvider.state('new-account', {
    url: '/new-account',
    templateUrl: 'templates/create-account.html'
  });
  $stateProvider.state('agenda', {
    url: '/agenda',
    templateUrl: 'templates/agenda.html'
  });
  $stateProvider.state('create-account', {
    url: '/new-account',
    templateUrl: 'templates/create-account.html'
  });
  $urlRouterProvider.otherwise('/create-account');
});

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
  return $scope.signIn = function(user) {
    if (user !== null) {
      console.log('Sign-In', user);
      return $state.go('list-view');
    } else {
      return alert('Preencha os campos');
    }
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
    templateUrl: 'templates/login.html',
    controller: 'SignInCtrl'
  });
  $stateProvider.state('registration_new', {
    url: '/registration/new',
    templateUrl: 'templates/registration_new.html'
  });
  $stateProvider.state('password_recovery', {
    url: '/password_recovery',
    templateUrl: 'templates/password_recovery.html'
  });
  $urlRouterProvider.otherwise('/create-account');
});

angular.module('starter', [
  'ionic'
  'ui.router'
]).run(($ionicPlatform) ->
  $ionicPlatform.ready ->
    if window.cordova and window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
    if window.StatusBar
      StatusBar.styleDefault()
      
).controller('SignInCtrl', ($scope, $state) ->

  $scope.signIn = (user) ->
    if user != null
      console.log 'Sign-In', user
      $state.go 'list-view'
    else
      alert 'Preencha os campos'

  # $scope.createAccount = ->
  #   $state.go 'create-account'

).controller('ListViewCtrl', ($scope) ->
  console.log 'ListViewCtrl'
).controller('MainCtrl', ($scope, $ionicSideMenuDelegate) ->
  console.log $scope, $ionicSideMenuDelegate

  $scope.toggleLeft = ->
    $ionicSideMenuDelegate.toggleLeft()

).config ($stateProvider, $urlRouterProvider) ->
  $stateProvider.state 'index',
    url: ''
    templateUrl: 'templates/login.html'
    controller: 'SignInCtrl'

  $stateProvider.state 'registration_new',
    url: '/registration/new'
    templateUrl: 'templates/registration_new.html'

  $stateProvider.state 'password_recovery',
    url: '/password_recovery'
    templateUrl: 'templates/password_recovery.html'

  # $stateProvider.state('eventmenu', {
  #     url: "/event",
  #     abstract: true,
  #     templateUrl: "templates/event-menu.html"
  #   })
  # $stateProvider.state('eventmenu.home', {
  #     url: "/home",
  #     views: {
  #       'menuContent' :{
  #         templateUrl: "templates/home.html"
  #       }
  #     }
  #   })
  # $stateProvider.state('eventmenu.checkin', {
  #     url: "/check-in",
  #     views: {
  #       'menuContent' :{
  #         templateUrl: "templates/check-in.html",
  #         controller: "CheckinCtrl"
  #       }
  #     }
  #   })
  # $stateProvider.state('eventmenu.attendees', {
  #     url: "/attendees",
  #     views: {
  #       'menuContent' :{
  #         templateUrl: "templates/attendees.html",
  #         controller: "AttendeesCtrl"
  #       }
  #     }
  #   })
  $urlRouterProvider.otherwise '/create-account'
  return

# ---
# generated by js2coffee 2.1.0
angular.module('starter', ['ionic', 'ui.router'])
//inicia o ionic
.run(function($ionicPlatform){
  $ionicPlatform.ready(function(){
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//controllers
.controller('SignInCtrl', function($scope, $state) {
  $scope.signIn = function(user) {
    if(user != null){
      console.log('Sign-In', user);
      $state.go('list-view');
    }else{
      alert('Preencha os campos');
    }
  };

  $scope.createAccount = function(){
    $state.go('create-account');
  }
})

.controller('ListViewCtrl', function($scope) {
  console.log('ListViewCtrl');
})

//controllers list-view
.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log($scope, $ionicSideMenuDelegate);
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

//configuraçao de rotas
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider.state('index', {
    url: '/',
    templateUrl: "index.html",
    controller: 'SignInCtrl'
  })

  $stateProvider.state('list-view', {
    url: '/index',
    templateUrl: 'templates/list-view.html',
  })

  $stateProvider.state('new-account', {
    url: '/new-account',
    templateUrl: 'templates/create-account.html'
  })

  $stateProvider.state('agenda', {
    url: '/agenda',
    templateUrl: 'templates/agenda.html'
  })

  $stateProvider.state('create-account', {
    url: '/new-account',
    templateUrl: 'templates/create-account.html'
  })

  // $stateProvider.state('eventmenu', {
  //     url: "/event",
  //     abstract: true,
  //     templateUrl: "templates/event-menu.html"
  //   })

  // $stateProvider.state('eventmenu.home', {
  //     url: "/home",
  //     views: {
  //       'menuContent' :{
  //         templateUrl: "templates/home.html"
  //       }
  //     }
  //   })

  // $stateProvider.state('eventmenu.checkin', {
  //     url: "/check-in",
  //     views: {
  //       'menuContent' :{
  //         templateUrl: "templates/check-in.html",
  //         controller: "CheckinCtrl"
  //       }
  //     }
  //   })

  // $stateProvider.state('eventmenu.attendees', {
  //     url: "/attendees",
  //     views: {
  //       'menuContent' :{
  //         templateUrl: "templates/attendees.html",
  //         controller: "AttendeesCtrl"
  //       }
  //     }
  //   })

$urlRouterProvider.otherwise("/create-account");
})
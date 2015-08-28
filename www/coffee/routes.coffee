app.config ($stateProvider, $urlRouterProvider) ->
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

  $urlRouterProvider.otherwise '/create-account'
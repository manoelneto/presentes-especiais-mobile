app.config ($stateProvider, $urlRouterProvider) ->
<<<<<<< HEAD
  
  #$stateProvider.state 'index',
  #  url: ''
  # templateUrl: 'templates/login.html'
  #  controller: 'SignInCtrl'
=======
>>>>>>> 2f66522b3653d70117de954076db34d49b81ba57

  $stateProvider.state 'index',
    url: ''
    templateUrl: 'templates/login.html'
    controller: 'SignInCtrl'

  # $stateProvider.state 'index',
  #   url: '/'
  #   templateUrl: 'templates/products/index.html'
  #   controller: 'ProductIndexCtrl'

  # $stateProvider.state 'index',
  #   url: '/'
  #   templateUrl: 'templates/products/show.html'
  #   controller: 'ProductShowCtrl'

  $stateProvider.state 'registration_new',
    url: '/registration/new'
    templateUrl: 'templates/registration_new.html'
    controller: 'RegistrationNewCtrl'

  $stateProvider.state 'password_recovery',
    url: '/password_recovery'
    templateUrl: 'templates/password_recovery.html'

  $stateProvider.state 'modules_list',
    url: '/modules_list'
    templateUrl: 'templates/modules_list.html'
    controller: 'ModulesListCtrl'

  $stateProvider.state 'products_index',
    url: '/produtos'
    templateUrl: 'templates/products/index.html'
    controller: 'ProductIndexCtrl'

  $stateProvider.state 'products_show',
    url: '/produtos/:id'
    templateUrl: 'templates/products/show.html'
    controller: 'ProductShowCtrl'

  $stateProvider.state 'indication',
    url: '/indicacao'
    templateUrl: 'templates/indication.html'
    controller: 'IndicationCtrl'

  $urlRouterProvider.otherwise '/'


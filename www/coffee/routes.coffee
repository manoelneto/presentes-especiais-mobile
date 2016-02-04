app.config ($stateProvider, $urlRouterProvider) ->

  #$stateProvider.state 'index',
  #  url: ''
  # templateUrl: 'templates/login.html'
  #  controller: 'SignInCtrl'

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

  $stateProvider.state 'product_personalization',
    url: '/produtos/:id/personalizar'
    templateUrl: 'templates/products/personalization.html'
    controller: 'ProductPersonalizationCtrl'

  $stateProvider.state 'products_show',
    url: '/produtos/:id'
    templateUrl: 'templates/products/show.html'
    controller: 'ProductShowCtrl'

  $stateProvider.state 'categories_show',
    url: '/categorias/:id'
    templateUrl: 'templates/categories/show.html'
    controller: 'CategoryShowCtrl'

  $stateProvider.state 'indication',
    url: '/indicacao'
    templateUrl: 'templates/indication.html'
    controller: 'IndicationCtrl'

  $stateProvider.state 'login',
    url: '/login'
    templateUrl: 'templates/login.html'
    controller: 'SignInCtrl'

  $stateProvider.state 'cart',
    url: '/carrinho'
    templateUrl: 'templates/cart.html'
    controller: 'CartCtrl'

  $urlRouterProvider.otherwise '/produtos'


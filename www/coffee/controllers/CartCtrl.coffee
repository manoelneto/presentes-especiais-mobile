app.controller 'CartCtrl', ['$scope', '$state', 'Utils', 'CartFacade', 'Cart',
  ($scope, $state, Utils, CartFacade, Cart) ->

    $scope.loading = true

    # criamos um cart sem nada inicialmente
    $scope.cart = new Cart({})

    CartFacade.getUserCart().then (cart) ->
      $scope.cart = cart
      $scope.loading = false

    $scope.delete = (cartItem) ->
      if confirm 'Tem certeza que quer retirar o item do carrinho?'
        CartFacade.delete(cartItem);

]

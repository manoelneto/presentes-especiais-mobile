app.controller('CartCtrl', [
  '$scope', '$state', 'Utils', 'CartFacade', 'Cart', function($scope, $state, Utils, CartFacade, Cart) {
    $scope.loading = true;
    $scope.cart = new Cart({});
    CartFacade.getUserCart().then(function(cart) {
      $scope.cart = cart;
      return $scope.loading = false;
    });
    return $scope["delete"] = function(cartItem) {
      if (confirm('Tem certeza que quer retirar o item do carrinho?')) {
        return CartFacade["delete"](cartItem);
      }
    };
  }
]);

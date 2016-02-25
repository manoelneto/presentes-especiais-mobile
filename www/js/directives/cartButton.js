app.directive('cartButton', [
  'CartFacade', function(CartFacade) {
    return {
      templateUrl: 'templates/directives/cart-button.html',
      link: function(scope, el, attrs) {
        var refreshCartButtonCounter;
        scope.cartQuantity = '...';
        refreshCartButtonCounter = function() {
          return CartFacade.getCartQuantity().then(function(qtt) {
            return scope.cartQuantity = qtt;
          });
        };
        refreshCartButtonCounter();
        return scope.$on('CartFacade.cartQuantityChanged', refreshCartButtonCounter);
      }
    };
  }
]);

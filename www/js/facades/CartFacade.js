app.factory('CartFacade', [
  '$q', '$rootScope', 'CartService', 'CartItemService', '$location', function($q, $rootScope, CartService, CartItemService, $location) {
    var cartQuantity, decrementCartQuantity, incrementCartQuantity, refreshAllCartListeners;
    cartQuantity = 2;
    refreshAllCartListeners = function() {
      return $rootScope.$broadcast('CartFacade.cartQuantityChanged');
    };
    incrementCartQuantity = function() {
      cartQuantity++;
      return refreshAllCartListeners();
    };
    decrementCartQuantity = function() {
      cartQuantity--;
      return refreshAllCartListeners();
    };
    return {
      getCartQuantity: function() {
        return CartItemService.getCount();
      },
      getUserCart: function() {
        return CartService.getUserCart();
      },
      addItemToCart: function(product, userPer, quantity, price) {
        return $q(function(resolve, reject) {
          var params;
          params = {
            spree_product_id: product.getId(),
            price: price,
            quantity: quantity
          };
          if (userPer) {
            angular.extend(params, {
              user_per_id: userPer.getId()
            });
          }
          return CartItemService.create(params).then(function() {
            incrementCartQuantity();
            return resolve.apply(null, arguments);
          })["catch"](function() {
            return reject.apply(null, arguments);
          });
        });
      },
      addProductToCart: function(product) {
        return this.addItemToCart(product, null, 1, product.getPriceInCents());
      },
      "delete": function(cartItem) {
        return CartItemService["delete"](cartItem.getId()).then(function() {
          var cart;
          cart = cartItem.getCart();
          cart.deleteCartItem(cartItem);
          return decrementCartQuantity();
        });
      },
      goToCart: function() {
        return $location.path("/carrinho");
      }
    };
  }
]);

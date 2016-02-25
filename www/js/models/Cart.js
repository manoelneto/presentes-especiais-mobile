var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("Cart", [
  'Model', 'CartItem', function(Model, CartItem) {
    var Cart;
    Cart = (function(superClass) {
      extend(Cart, superClass);

      function Cart() {
        var base, self;
        Cart.__super__.constructor.apply(this, arguments);
        self = this;
        (base = this.attributes).cart_items || (base.cart_items = []);
        this.cartItens = this.attributes.cart_items.map(function(cart_item) {
          angular.extend(cart_item, {
            cart: self
          });
          return new CartItem(cart_item);
        });
      }

      Cart.prototype.getCartItens = function() {
        return this.cartItens;
      };

      Cart.prototype.deleteCartItem = function(cartItem) {
        return this.cartItens = this.cartItens.filter(function(ci) {
          return ci !== cartItem;
        });
      };

      return Cart;

    })(Model);
    return Cart;
  }
]);

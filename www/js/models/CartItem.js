var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("CartItem", [
  'Model', 'Product', function(Model, Product) {
    var CartItem;
    CartItem = (function(superClass) {
      extend(CartItem, superClass);

      function CartItem() {
        CartItem.__super__.constructor.apply(this, arguments);
        this.product = new Product(this.get('spree_product'));
      }

      CartItem.prototype.getName = function() {
        return this.product.get('name');
      };

      CartItem.prototype.getProductImage = function() {
        return this.product.getSmallImage();
      };

      CartItem.prototype.getPriceInReal = function() {
        var price;
        price = this.get('price');
        return price / 100;
      };

      CartItem.prototype.getCart = function() {
        return this.get('cart');
      };

      return CartItem;

    })(Model);
    return CartItem;
  }
]);

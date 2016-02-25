var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('CartService', [
  'Service', 'API', '$http', '$q', 'Cart', function(Service, API, $http, $q, Cart) {
    var CartService, cartResponse;
    cartResponse = {
      cart_items: [
        {
          name: "Bolsa item x",
          quantity: 1,
          price: 10000,
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        }, {
          name: "outra bolsa",
          quantity: 1,
          price: 10000,
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        }
      ]
    };
    CartService = (function(superClass) {
      extend(CartService, superClass);

      function CartService() {
        return CartService.__super__.constructor.apply(this, arguments);
      }

      CartService.baseUrl = API.spree_base + "/carts";

      CartService.plural_resource_name = function() {
        return 'carts';
      };

      CartService.getUserCart = function() {
        return $q((function(_this) {
          return function(resolve, reject) {
            var options;
            options = angular.extend({}, _this.getHeaders(), {
              url: _this.baseUrl + "/user_cart.json",
              method: 'get'
            });
            return $http(options).then(function(response) {
              var item;
              item = _this.getItenFromResponse(response);
              item = new Cart(item);
              console.log(item);
              return resolve(item);
            })["catch"](function() {
              return reject();
            });
          };
        })(this));
      };

      return CartService;

    })(Service);
    return CartService;
  }
]);

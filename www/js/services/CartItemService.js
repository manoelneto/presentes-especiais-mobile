var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('CartItemService', [
  'Service', 'API', '$http', '$q', 'CartItem', function(Service, API, $http, $q, CartItem) {
    var CartItemService;
    CartItemService = (function(superClass) {
      extend(CartItemService, superClass);

      function CartItemService() {
        return CartItemService.__super__.constructor.apply(this, arguments);
      }

      CartItemService.baseUrl = API.spree_base + "/cart_items";

      CartItemService.modelClass = CartItem;

      CartItemService.plural_resource_name = function() {
        return 'cart_items';
      };

      CartItemService.getCount = function() {
        return $q((function(_this) {
          return function(resolve, reject) {
            var options;
            options = angular.extend({}, _this.getHeaders(), {
              url: _this.baseUrl + "/count.json",
              method: 'get'
            });
            return $http(options).then(function(response) {
              return resolve(response.data.count);
            })["catch"](function() {
              return reject();
            });
          };
        })(this));
      };

      return CartItemService;

    })(Service);
    return CartItemService;
  }
]);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('CartService', [
  'Service', 'API', '$http', '$q', '$timeout', function(Service, API, $http, $q, $timeout) {
    var CartService;
    CartService = (function(superClass) {
      extend(CartService, superClass);

      function CartService() {
        return CartService.__super__.constructor.apply(this, arguments);
      }

      CartService.baseUrl = API.spree_base + "/carts";

      CartService.plural_resource_name = function() {
        return 'carts';
      };

      return CartService;

    })(Service);
    return CartService;
  }
]);

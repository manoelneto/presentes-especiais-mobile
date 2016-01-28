var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('ProductService', [
  'Service', 'Product', 'API', '$http', '$q', '$timeout', function(Service, Product, API, $http, $q, $timeout) {
    var ProductService;
    ProductService = (function(superClass) {
      extend(ProductService, superClass);

      function ProductService() {
        return ProductService.__super__.constructor.apply(this, arguments);
      }

      ProductService.baseUrl = API.spree_base + "/products";

      ProductService.modelClass = Product;

      ProductService.plural_resource_name = function() {
        return 'products';
      };

      return ProductService;

    })(Service);
    return ProductService;
  }
]);

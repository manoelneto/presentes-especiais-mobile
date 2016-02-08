var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('CategoryService', [
  'Service', 'Category', 'API', '$http', '$q', '$timeout', function(Service, Category, API, $http, $q, $timeout) {
    var CategoryService;
    CategoryService = (function(superClass) {
      extend(CategoryService, superClass);

      function CategoryService() {
        return CategoryService.__super__.constructor.apply(this, arguments);
      }

      CategoryService.baseUrl = API.spree_base + "/categories";

      CategoryService.modelClass = Category;

      CategoryService.plural_resource_name = function() {
        return 'categories';
      };

      return CategoryService;

    })(Service);
    return CategoryService;
  }
]);

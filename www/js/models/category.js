var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("Category", [
  'Model', 'API', 'Product', function(Model, API, Product) {
    var Category;
    Category = (function(superClass) {
      extend(Category, superClass);

      function Category() {
        return Category.__super__.constructor.apply(this, arguments);
      }

      Category.prototype.getName = function() {
        return this.attributes.name;
      };

      Category.prototype.getUrl = function() {
        return "/categorias/" + this.attributes.id;
      };

      Category.prototype.getProducts = function() {
        if (!this.products) {
          this.products = this.attributes.products.map(function(product) {
            return new Product(product);
          });
        }
        return this.products;
      };

      Category.prototype.getSmallImage = function() {
        return "" + API.base_image_url + this.attributes.picture_small_thumb;
      };

      return Category;

    })(Model);
    return Category;
  }
]);

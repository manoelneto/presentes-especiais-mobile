var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("Product", [
  'Model', 'API', function(Model, API) {
    var Product;
    Product = (function(superClass) {
      extend(Product, superClass);

      function Product() {
        return Product.__super__.constructor.apply(this, arguments);
      }

      Product.prototype.getName = function() {
        return this.get('name');
      };

      Product.prototype.getThemes = function() {
        return this.get('themes');
      };

      Product.prototype.getPrice = function() {
        return this.get('price');
      };

      Product.prototype.getPriceInCents = function() {
        return parseInt(this.get('price').replace('.', ''));
      };

      Product.prototype.canPersonalizate = function() {
        return this.get('has_personalization');
      };

      Product.prototype.getSmallImage = function() {
        var images;
        images = this.attributes.master.images.map(function(image) {
          return "" + API.base_image_url + image.product_url;
        });
        return images[0];
      };

      Product.prototype.getPersonalizationUrl = function() {
        return "#/produtos/" + this.attributes.id + "/personalizar";
      };

      return Product;

    })(Model);
    return Product;
  }
]);

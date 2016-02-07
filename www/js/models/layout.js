var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("Layout", [
  'Model', 'AreaEdition', function(Model, AreaEdition) {
    var Layout;
    Layout = (function(superClass) {
      extend(Layout, superClass);

      function Layout() {
        Layout.__super__.constructor.apply(this, arguments);
        this.area_editions = this.attributes.area_editions.map(function(area_edition) {
          return new AreaEdition(area_edition);
        });
      }

      Layout.prototype.getAreaEditions = function() {
        return this.area_editions;
      };

      Layout.prototype.getName = function() {
        return this.attributes.name;
      };

      return Layout;

    })(Model);
    return Layout;
  }
]);

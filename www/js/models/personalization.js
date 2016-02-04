var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("Personalization", [
  'Model', 'Layout', function(Model, Layout) {
    var Personalization;
    Personalization = (function(superClass) {
      extend(Personalization, superClass);

      function Personalization() {
        Personalization.__super__.constructor.apply(this, arguments);
        this.layouts = this.attributes.layouts.map(function(layout) {
          return new Layout(layout);
        });
      }

      Personalization.prototype.getLayouts = function() {
        return this.layouts;
      };

      return Personalization;

    })(Model);
    return Personalization;
  }
]);

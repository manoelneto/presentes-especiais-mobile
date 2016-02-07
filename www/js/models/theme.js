var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("Theme", [
  'Model', 'Personalization', function(Model, Personalization) {
    var Theme;
    Theme = (function(superClass) {
      extend(Theme, superClass);

      function Theme() {
        Theme.__super__.constructor.apply(this, arguments);
        this.personalizations = this.attributes.personalizations.map(function(personalization) {
          return new Personalization(personalization);
        });
      }

      Theme.prototype.getPersonalizations = function() {
        return this.personalizations;
      };

      Theme.prototype.getName = function() {
        return this.attributes.name;
      };

      Theme.prototype.getId = function() {
        return this.attributes.id;
      };

      return Theme;

    })(Model);
    return Theme;
  }
]);

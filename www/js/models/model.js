app.factory("Model", function() {
  var Model;
  Model = (function() {
    function Model(attributes) {
      this.attributes = attributes;
    }

    Model.prototype.get = function(attribute) {
      return this.attributes[attribute];
    };

    Model.prototype.getId = function() {
      return this.get('id');
    };

    Model.prototype.isNew = function() {
      return !this.getId();
    };

    return Model;

  })();
  return Model;
});

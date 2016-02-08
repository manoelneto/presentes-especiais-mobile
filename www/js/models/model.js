app.factory("Model", function() {
  var Model;
  Model = (function() {
    function Model(attributes) {
      this.attributes = attributes;
    }

    Model.prototype.getId = function() {
      return this.attributes.id;
    };

    return Model;

  })();
  return Model;
});

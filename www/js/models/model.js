app.factory("Model", [
  function() {
    var Model;
    Model = (function() {
      function Model(attributes) {
        this.attributes = attributes;
      }

      return Model;

    })();
    return Model;
  }
]);

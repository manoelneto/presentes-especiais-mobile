app.factory("Utils", [
  function() {
    return {
      chunckBy: function(quantity, arr) {
        var aux, result;
        result = [];
        aux = [];
        arr.forEach(function(value) {
          aux.push(value);
          if (aux.length === quantity) {
            result.push(aux);
            return aux = [];
          }
        });
        if (aux.length > 0) {
          result.push(aux);
        }
        return result;
      },
      chunckByTwo: function(arr) {
        return this.chunckBy(2, arr);
      }
    };
  }
]);

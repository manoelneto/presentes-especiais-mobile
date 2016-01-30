app.factory("Service", [
  '$http', '$q', function($http, $q) {
    var Service;
    Service = (function() {
      function Service() {}

      Service.baseUrl = "";

      Service.modelClass = "";

      Service.index = function() {
        return $q((function(_this) {
          return function(resolve, reject) {
            return $http.get(_this.baseUrl + ".json").then(function(response) {
              var itens;
              itens = _this.getItensFromResponse(response);
              itens = itens.map(function(item) {
                return new _this.modelClass(item);
              });
              return resolve(itens);
            })["catch"](function() {
              return reject();
            });
          };
        })(this));
      };

      Service.find = function(id) {
        return $q((function(_this) {
          return function(resolve, reject) {
            return $http.get(_this.baseUrl + "/" + id + ".json").then(function(response) {
              var item;
              item = _this.getItenFromResponse(response);
              item = new _this.modelClass(item);
              return resolve(item);
            })["catch"](function() {
              return reject();
            });
          };
        })(this));
      };

      Service.getItensFromResponse = function(response) {
        return response.data[this.plural_resource_name()];
      };

      Service.getItenFromResponse = function(response) {
        return response.data;
      };

      Service.plural_resource_name = function() {
        throw "Please implement getItensFromResponse";
      };

      return Service;

    })();
    return Service;
  }
]);

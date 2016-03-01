app.factory("Service", [
  '$http', '$q', 'User', function($http, $q, User) {
    var Service;
    Service = (function() {
      function Service() {}

      Service.baseUrl = "";

      Service.modelClass = "";

      Service.index = function() {
        return $q((function(_this) {
          return function(resolve, reject) {
            var options;
            options = angular.extend({}, _this.getHeaders(), {
              url: _this.baseUrl + ".json",
              method: 'get'
            });
            return $http(options).then(function(response) {
              var itens;
              itens = _this.getItensFromResponse(response);
              itens = itens.map(function(item) {
                return new _this.modelClass(item);
              });
              return resolve(itens);
            })["catch"](function() {
              console.log(JSON.stringify(arguments));
              return reject();
            });
          };
        })(this));
      };

      Service.find = function(id) {
        return $q((function(_this) {
          return function(resolve, reject) {
            var options;
            options = angular.extend({}, _this.getHeaders(), {
              url: _this.baseUrl + "/" + id + ".json",
              method: 'get'
            });
            return $http(options).then(function(response) {
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

      Service.create = function(params) {
        return $q((function(_this) {
          return function(resolve, reject) {
            var options;
            options = angular.extend({}, _this.getHeaders(), {
              url: _this.baseUrl + ".json",
              method: 'post',
              data: params
            });
            return $http(options).then(function(response) {
              var item;
              item = _this.getItenFromResponse(response);
              item = new _this.modelClass(item);
              return resolve(item);
            })["catch"](function() {
              console.log(JSON.stringify(arguments));
              return reject.apply(null, arguments);
            });
          };
        })(this));
      };

      Service["delete"] = function(id) {
        console.log("deleting");
        return $q((function(_this) {
          return function(resolve, reject) {
            var options;
            options = angular.extend({}, _this.getHeaders(), {
              url: _this.baseUrl + "/" + id + ".json",
              method: 'delete'
            });
            return $http(options).then(function(response) {
              console.log("deleted");
              return resolve();
            })["catch"](function() {
              console.log("deleting error");
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

      Service.getHeaders = function() {
        var headers;
        headers = {};
        if (User.current_user && User.current_user.spree_api_key) {
          angular.extend(headers, {
            'X-Spree-Token': User.current_user.spree_api_key
          });
        }
        return {
          headers: headers
        };
      };

      return Service;

    })();
    return Service;
  }
]);

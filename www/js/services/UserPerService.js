var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('UserPerService', [
  'Service', 'UserPer', 'API', '$http', '$q', '$timeout', function(Service, UserPer, API, $http, $q, $timeout) {
    var UserPerService;
    UserPerService = (function(superClass) {
      extend(UserPerService, superClass);

      function UserPerService() {
        return UserPerService.__super__.constructor.apply(this, arguments);
      }

      UserPerService.baseUrl = API.spree_base + "/user_pers";

      UserPerService.modelClass = UserPer;

      UserPerService.plural_resource_name = function() {
        return 'user_pers';
      };

      return UserPerService;

    })(Service);
    return UserPerService;
  }
]);

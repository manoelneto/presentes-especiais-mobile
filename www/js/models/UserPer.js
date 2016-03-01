var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("UserPer", [
  'Model', 'API', function(Model, API) {
    var UserPer;
    UserPer = (function(superClass) {
      extend(UserPer, superClass);

      function UserPer() {
        return UserPer.__super__.constructor.apply(this, arguments);
      }

      return UserPer;

    })(Model);
    return UserPer;
  }
]);

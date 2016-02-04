var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.service('ChartService', [
  'Service', 'Chart', 'API', '$http', '$q', '$timeout', function(Service, Chart, API, $http, $q, $timeout) {
    var ChartService;
    ChartService = (function(superClass) {
      extend(ChartService, superClass);

      function ChartService() {
        return ChartService.__super__.constructor.apply(this, arguments);
      }

      ChartService.baseUrl = API.spree_base + "/charts";

      ChartService.modelClass = Chart;

      ChartService.plural_resource_name = function() {
        return 'charts';
      };

      return ChartService;

    })(Service);
    return ChartService;
  }
]);

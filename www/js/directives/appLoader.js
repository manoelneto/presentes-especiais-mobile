app.directive('appLoader', [
  function() {
    return {
      scope: {
        model: "="
      },
      templateUrl: 'templates/directives/app-loader.html',
      link: function(scope, el, attrs) {
        return scope.getClass = function() {
          if (scope.model) {
            return "show";
          } else {
            return "";
          }
        };
      }
    };
  }
]);

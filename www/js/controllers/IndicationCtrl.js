app.controller("IndicationCtrl", [
  "$scope", "IndicationService", function($scope, IndicationService) {
    $scope.posts = [];
    return IndicationService.loadPostsFaked().then(function(response) {
      return $scope.posts = response.data.data;
    });
  }
]);

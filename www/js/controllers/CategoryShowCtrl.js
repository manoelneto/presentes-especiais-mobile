app.controller('CategoryShowCtrl', [
  '$scope', '$state', 'CategoryService', 'Utils', '$timeout', function($scope, $state, CategoryService, Utils, $timeout) {
    var id;
    $scope.loading = true;
    id = $state.params.id;
    return CategoryService.find(id).then(function(category) {
      $scope.loading = false;
      $scope.category = category;
      return $scope.productsChuncks = Utils.chunckByTwo(category.getProducts());
    });
  }
]);

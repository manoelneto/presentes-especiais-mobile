app.controller('ProductIndexCtrl', [
  '$scope', '$state', 'Utils', 'ProductService', function($scope, $state, Utils, ProductService) {
    return ProductService.index().then(function(products) {
      return $scope.productsChuncks = Utils.chunckByTwo(products);
    });
  }
]);

app.controller('ProductIndexCtrl', [
  '$scope', '$state', 'Utils', 'ProductService', '$http', function($scope, $state, Utils, ProductService, $http) {
    return ProductService.index().then(function(products) {
      return $scope.productsChuncks = Utils.chunckByTwo(products);
    });
  }
]);

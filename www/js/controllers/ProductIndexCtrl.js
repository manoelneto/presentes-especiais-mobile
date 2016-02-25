app.controller('ProductIndexCtrl', [
  '$scope', '$state', 'Utils', 'ProductService', '$http', 'CartFacade', function($scope, $state, Utils, ProductService, $http, CartFacade) {
    $scope.loading = true;
    ProductService.index().then(function(products) {
      $scope.loading = false;
      return $scope.productsChuncks = Utils.chunckByTwo(products);
    });
    return $scope.addToCart = function(product) {
      $scope.loading = true;
      return CartFacade.addProductToCart(product).then(function() {
        return alert("Item adicionado com sucesso");
      })["catch"](function() {
        return alert("Houve um erro ao adicionar o item ao carrinho");
      })["finally"](function() {
        return $scope.loading = false;
      });
    };
  }
]);

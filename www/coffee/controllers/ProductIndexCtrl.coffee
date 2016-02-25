app.controller 'ProductIndexCtrl', ['$scope', '$state', 'Utils', 'ProductService', '$http', 'CartFacade', ($scope, $state, Utils, ProductService, $http, CartFacade) ->

  $scope.loading = true

  ProductService.index().then (products) ->
    $scope.loading = false
    $scope.productsChuncks = Utils.chunckByTwo(products)

  $scope.addToCart = (product) ->
    $scope.loading = true

    CartFacade.addProductToCart(product).then ->
      alert "Item adicionado com sucesso"
    .catch ->
      alert "Houve um erro ao adicionar o item ao carrinho"
    .finally ->
      $scope.loading = false

]

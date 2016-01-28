app.controller 'ProductIndexCtrl', ['$scope', '$state', 'Utils', 'ProductService', ($scope, $state, Utils, ProductService) ->

  ProductService.index().then (products) ->
    $scope.productsChuncks = Utils.chunckByTwo(products)

]

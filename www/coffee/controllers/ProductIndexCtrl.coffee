app.controller 'ProductIndexCtrl', ['$scope', '$state', 'Utils', 'ProductService', '$http', ($scope, $state, Utils, ProductService, $http) ->

  ProductService.index().then (products) ->
    $scope.productsChuncks = Utils.chunckByTwo(products)

]

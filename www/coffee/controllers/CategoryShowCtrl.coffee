app.controller 'CategoryShowCtrl', ['$scope', '$state', 'CategoryService', 'Utils', '$timeout', ($scope, $state, CategoryService, Utils, $timeout) ->

  id = $state.params.id

  CategoryService.find(id).then (category) ->
    $scope.category = category
    $scope.productsChuncks = Utils.chunckByTwo(category.getProducts())
]

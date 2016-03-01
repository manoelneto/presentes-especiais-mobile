app.controller 'CategoryShowCtrl', ['$scope', '$state', 'CategoryService', 'Utils', '$timeout', ($scope, $state, CategoryService, Utils, $timeout) ->

  $scope.loading = true

  id = $state.params.id

  CategoryService.find(id).then (category) ->
    $scope.loading = false
    $scope.category = category
    $scope.productsChuncks = Utils.chunckByTwo(category.getProducts())
]

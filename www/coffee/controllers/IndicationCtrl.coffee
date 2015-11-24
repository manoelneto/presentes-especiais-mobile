app.controller "IndicationCtrl", ["$scope", "IndicationService", ($scope, IndicationService) ->

  $scope.posts = []

  IndicationService.loadPostsFaked().then (response) ->
    $scope.posts = response.data.data
  # .fail ->
  #   alert "posts não puderam ser carregados"

]

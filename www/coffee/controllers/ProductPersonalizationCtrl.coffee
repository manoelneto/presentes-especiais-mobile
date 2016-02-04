app.controller 'ProductPersonalizationCtrl', ['$scope', '$state', 'ProductService', 'UserPersonalization', ($scope, $state, ProductService, UserPersonalization) ->
  id = $state.params.id

  ProductService.find(id).then (product) ->
    $scope.product = product
    createUserPersonalization()

  createUserPersonalization = ->
    $scope.userPersonalization = new UserPersonalization($scope.product.getThemes())

    $scope.userPersonalization.onChange 'personalization', (personalization) ->
      $scope.personalization = personalization

    $scope.userPersonalization.onChange 'theme', (theme) ->
      $scope.theme = theme

    $scope.userPersonalization.onChange 'layout', (layout) ->
      $scope.layout = layout

    $scope.userPersonalization.setDefault()

]

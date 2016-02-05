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

  $scope.imagePicker = ->

    console.log 'runing image picker'

    options =
      maximumImagesCount: 10
      width: 800
      height: 800
      quality: 80

    imagePicker.getPictures (results) ->
      console.log results
      i = 0
      while i < results.length
        console.log 'Image URI: ' + results[i]
        i++
      return
    , (error) ->
      console.log "error getting photos"
      # error getting photos
      return
    , options

]

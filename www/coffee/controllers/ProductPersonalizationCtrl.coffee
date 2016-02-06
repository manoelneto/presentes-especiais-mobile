app.controller 'ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', 'GalleryImageStrategy', '$timeout', '$q'
  ($scope, $state, ProductService, UserPersonalization, GalleryImageStrategy, $timeout, $q) ->
    id = $state.params.id

    ProductService.find(id).then (product) ->
      $scope.product = product
      createUserPersonalization()

    createUserPersonalization = ->
      # pThemes = $scope.product.getThemes()
      pThemes = [
        {
          id: 17,
          name: 'Teste de tema',
          personalizations: [
            {
              id: 6
              name: "Teste"
              order: null
              picture_area_bg: "/uploads/personalization/picture/6/area_bg_pp.jpeg"
              layouts: [
                {
                  id: 6
                  name: "teste de layout"
                  order: null
                  area_editions: [
                    {
                      area_type: "image"
                      id: 18
                      name: "imagem ao centro"
                      order: null
                      required: false
                      x1: 138
                      x2: 337
                      y1: 109
                      y2: 263
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
      $scope.userPersonalization = new UserPersonalization(pThemes)

      $scope.userPersonalization.onChange 'personalization', (personalization) ->
        $scope.personalization = personalization

      $scope.userPersonalization.onChange 'theme', (theme) ->
        $scope.theme = theme

      $scope.userPersonalization.onChange 'layout', (layout) ->
        $scope.layout = layout

      $scope.userPersonalization.setDefault()

    $scope.loadAreaData = (areaEdition) ->
      if areaEdition.isImage()
        imagePicker(areaEdition)

    imagePicker = (areaEdition) ->
      galleryStrategy = new GalleryImageStrategy()
      galleryStrategy.loadPicture().then (pictures) ->
        $timeout ->
          areaEdition.setPicture pictures[0]
      .catch ->
        console.log arguments
]

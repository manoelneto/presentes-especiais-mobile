app.controller 'ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', 'GalleryImageStrategy', '$timeout', '$jrCrop', '$ionicModal',
  ($scope, $state, ProductService, UserPersonalization, GalleryImageStrategy, $timeout, $jrCrop, $ionicModal) ->
    id = $state.params.id

    ProductService.find(id).then (product) ->
      $scope.product = product
      createUserPersonalization()

    createUserPersonalization = ->
      pThemes = $scope.product.getThemes()
      # pThemes = [
      #   {
      #     id: 17,
      #     name: 'Teste de tema',
      #     personalizations: [
      #       {
      #         id: 6
      #         name: "Teste"
      #         order: null
      #         picture_area_bg: "/uploads/personalization/picture/6/area_bg_pp.jpeg"
      #         layouts: [
      #           {
      #             id: 6
      #             name: "teste de layout"
      #             order: null
      #             area_editions: [
      #               {
      #                 area_type: "image"
      #                 id: 18
      #                 name: "imagem ao centro"
      #                 order: null
      #                 required: false
      #                 x1: 138
      #                 x2: 337
      #                 y1: 109
      #                 y2: 263
      #               }
      #               {
      #                 "id": 19,
      #                 "name": "texto de fundo",
      #                 "required": true,
      #                 "order": null,
      #                 "area_type": "text",
      #                 "x1": 24,
      #                 "y1": 398,
      #                 "x2": 469,
      #                 "y2": 464
      #               }
      #             ]
      #           }
      #         ]
      #       }
      #     ]
      #   }
      # ]
      $scope.userPersonalization = new UserPersonalization(pThemes)

      $scope.userPersonalization.onChange 'personalization', (personalization) ->
        $scope.personalization = personalization

      $scope.userPersonalization.onChange 'theme', (theme) ->
        $scope.theme = theme

      $scope.userPersonalization.onChange 'layout', (layout) ->
        $scope.layout = layout

      $scope.userPersonalization.setDefault()

    # abre o modal pedindo qual ação o usuário vai executar
    openChangeImageModal = (areaEdition) ->
      $scope.modalItem = areaEdition
      $ionicModal.fromTemplateUrl('templates/modals/personalization-change-image.html', {
        scope: $scope
        animation: 'slide-in-up'
      }).then (modal) ->
        $scope.modal = modal
        modal.show()


    $scope.executeProperAction = (areaEdition) ->
      if areaEdition.isImage()
        if areaEdition.hasData()
          openChangeImageModal(areaEdition)
        else
          imagePicker(areaEdition)

    # executado quando clicar no botão change no modal que for aberto
    $scope.modalChange = ->
      areaEdition = $scope.modalItem

      if areaEdition.isImage()
        $scope.modal.remove()
        imagePicker(areaEdition)

    # executado quando clicar no botão remove no modal que for aberto
    $scope.modalRemove = ->
      areaEdition = $scope.modalItem
      areaEdition.removeData()
      $scope.modal.remove()

    # remove o modal e fecha
    removeModal = ->
      $scope.modal.remove()

    # executado quando clicar em cancelar no modal, o remove
    $scope.modalCancel = removeModal

    # evitar memory leak, destroi o modal
    $scope.$on '$destroy', ->
      removeModal()

    # abre o modal para o usuário escolher a imagem
    imagePicker = (areaEdition) ->
      # no desktop, carregue uma imagem qualquer
      if not window.imagePicker
        areaEdition.setPicture 'https://placeholdit.imgix.net/~text?txtsize=23&bg=bada55&txt=500%C3%97500&w=500&h=500'
        return

      galleryStrategy = new GalleryImageStrategy()
      galleryStrategy.loadPicture().then (pictures) ->
        # se ele escolheu cancelar ou não escolheu nenhuma imagem
        if pictures.length == 0
          return false

        $jrCrop.crop({
            url: pictures[0]
            width: areaEdition.getWidth()
            height: areaEdition.getHeight()
            title: 'Corte sua imagem'
        }).then (canvas) ->
          $timeout ->
            areaEdition.setPicture canvas.toDataURL()
        , () ->
          console.log 'some error'
          console.log arguments

      .catch ->
        console.log arguments
]

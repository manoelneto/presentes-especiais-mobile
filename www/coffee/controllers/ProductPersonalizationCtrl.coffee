class State

  getSection: ->
    @section

class PersonalizationState extends State

  section: 'personalization'

  clickLayoutButton: ->
    new LayoutState()

  clickThemeButton: ->
    new ThemeState()

class LayoutState extends State

  section: 'layout'

  clickLayoutButton: ->
    new PersonalizationState()

  clickThemeButton: ->
    new ThemeState()

class ThemeState extends State

  section: 'theme'

  clickLayoutButton: ->
    new LayoutState()

  clickThemeButton: ->
    new PersonalizationState()

app.controller 'ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', 'GalleryImageStrategy', '$timeout',
  '$jrCrop', '$ionicModal', 'PersonalizationShare', 'UserPerService',
  ($scope, $state, ProductService, UserPersonalization, GalleryImageStrategy, $timeout, $jrCrop, $ionicModal, PersonalizationShare, UserPerService) ->
    id = $state.params.id

    $scope.state = new PersonalizationState()

    $scope.chooseLayout = ->
      if layoutChooseEnabled()
        $scope.state = $scope.state.clickLayoutButton()

    $scope.chooseTheme = ->
      if themeChooseEnabled()
        $scope.state = $scope.state.clickThemeButton()

    layoutChooseEnabled = ->
      if $scope.personalization
        if $scope.personalization.getLayouts().length > 1
          return true

      return false

    $scope.layoutButtonClass = ->
      toReturn = []
      if $scope.state.getSection() == 'layout'
        toReturn.push 'active'

      if not layoutChooseEnabled()
        toReturn.push 'disabled'

      toReturn.join(' ')

    themeChooseEnabled = ->
      if $scope.product
        if $scope.product.getThemes().length > 1
          return true

      return false

    $scope.themeButtonClass = ->
      toReturn = []
      if $scope.state.getSection() == 'theme'
        toReturn.push 'active'

      if not themeChooseEnabled()
        toReturn.push 'disabled'

      toReturn.join(' ')

    $scope.setTheme = (theme) ->
      $scope.state = new PersonalizationState()
      $scope.userPersonalization.setTheme(theme)

    $scope.setLayout = (layout) ->
      $scope.state = new PersonalizationState()
      $scope.userPersonalization.setLayout($scope.personalization, layout)

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

    $scope.completePersonalization = ->
      console.log $scope.userPersonalization.getCreateParams()
      UserPerService.create user_per: $scope.userPersonalization.getCreateParams()
        .then ->
          console.dir arguments

    # abre o modal pedindo qual ação o usuário vai executar
    openChangeImageModal = (areaEdition) ->
      $scope.modalItem = areaEdition
      $ionicModal.fromTemplateUrl('templates/modals/personalization-change-image.html', {
        scope: $scope
        animation: 'slide-in-up'
      }).then (modal) ->
        $scope.modal = modal
        modal.show()

    $scope.prevPersonalization = ->
      $scope.userPersonalization.setPrevPersonalization($scope.personalization)

    $scope.nextPersonalization = ->
      $scope.userPersonalization.setNextPersonalization($scope.personalization)

    $scope.showPrevButton = ->
      if $scope.userPersonalization
        return not $scope.userPersonalization.isFirstPersonalization($scope.personalization)

      return false

    $scope.showNextButton = ->
      if $scope.userPersonalization
        return not $scope.userPersonalization.isLastPersonalization($scope.personalization)

      return false

    $scope.showCompleteButton = ->
      if $scope.userPersonalization
        return $scope.userPersonalization.isLastPersonalization($scope.personalization) and $scope.userPersonalization.hasCompleted()
      return false

    $scope.executeProperAction = (areaEdition) ->
      if areaEdition.isImage()
        if $scope.userPersonalization.hasData areaEdition
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
      $scope.userPersonalization.removeData areaEdition
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
        $scope.userPersonalization.setData areaEdition, 'https://placeholdit.imgix.net/~text?txtsize=23&bg=bada55&txt=500%C3%97500&w=500&h=500'
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
            $scope.userPersonalization.setData areaEdition, canvas.toDataURL()
        , () ->
          console.log 'some error'
          console.log arguments

      .catch ->
        console.log arguments
]

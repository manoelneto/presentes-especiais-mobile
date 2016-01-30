app.factory 'SwiperFacade', ->

  init: (scope) ->
    scope.$broadcast 'swiperSlider.init'

  onInit: (scope, callback) ->
    scope.$on 'swiperSlider.init', callback

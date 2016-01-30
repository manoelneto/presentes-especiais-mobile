app.directive 'swiperSlider', ['$timeout', 'SwiperFacade', ($timeout, SwiperFacade) ->
  initSwiper = (container) ->
    swiper = new Swiper(container, {
      # slides with no fix width
      slidesPerView: 'auto'

      # selector of next class
      nextButton: '.swiper-button-next'

      # selector of prev class
      prevButton: '.swiper-button-prev'

      # space between slides
      spaceBetween: 20
    })

  transclude: true
  templateUrl: 'templates/directives/swiper-slider.html'
  scope:
    wait: '&wait'

  link: (scope, el, attrs) ->

    wait = scope.wait()

    # findind container
    childArray = Array.prototype.slice.call el.children()
    container = childArray.filter (child) ->
      angular.element(child).hasClass 'swiper-container'

    if not wait
      initSwiper container
    else
      # you must call swiper facade init to
      # init here
      SwiperFacade.onInit scope, ->
        $timeout ->
          initSwiper container
        , 100

]

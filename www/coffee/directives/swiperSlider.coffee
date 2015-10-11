app.directive 'swiperSlider', ['$timeout', ($timeout) ->
  transclude: true
  templateUrl: 'templates/directives/swiper-slider.html'

  link: (scope, el, attrs) ->

    # findind container
    childArray = Array.prototype.slice.call el.children()
    container = childArray.filter (child) ->
      angular.element(child).hasClass 'swiper-container'

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
]

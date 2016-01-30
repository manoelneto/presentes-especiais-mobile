app.directive('swiperSlider', [
  '$timeout', 'SwiperFacade', function($timeout, SwiperFacade) {
    var initSwiper;
    initSwiper = function(container) {
      var swiper;
      return swiper = new Swiper(container, {
        slidesPerView: 'auto',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 20
      });
    };
    return {
      transclude: true,
      templateUrl: 'templates/directives/swiper-slider.html',
      scope: {
        wait: '&wait'
      },
      link: function(scope, el, attrs) {
        var childArray, container, wait;
        wait = scope.wait();
        childArray = Array.prototype.slice.call(el.children());
        container = childArray.filter(function(child) {
          return angular.element(child).hasClass('swiper-container');
        });
        if (!wait) {
          return initSwiper(container);
        } else {
          return SwiperFacade.onInit(scope, function() {
            return $timeout(function() {
              return initSwiper(container);
            }, 100);
          });
        }
      }
    };
  }
]);

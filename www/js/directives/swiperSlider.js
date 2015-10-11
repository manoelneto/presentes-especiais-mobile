app.directive('swiperSlider', [
  '$timeout', function($timeout) {
    return {
      transclude: true,
      templateUrl: 'templates/directives/swiper-slider.html',
      link: function(scope, el, attrs) {
        var childArray, container, swiper;
        childArray = Array.prototype.slice.call(el.children());
        container = childArray.filter(function(child) {
          return angular.element(child).hasClass('swiper-container');
        });
        return swiper = new Swiper(container, {
          slidesPerView: 'auto',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 20
        });
      }
    };
  }
]);

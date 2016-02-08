app.factory('SwiperFacade', function() {
  return {
    init: function(scope) {
      return scope.$broadcast('swiperSlider.init');
    },
    onInit: function(scope, callback) {
      return scope.$on('swiperSlider.init', callback);
    }
  };
});

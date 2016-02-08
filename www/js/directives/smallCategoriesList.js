app.directive('smallCategoriesList', [
  'CategoryService', 'SwiperFacade', function(CategoryService, SwiperFacade) {
    return {
      templateUrl: 'templates/directives/small-categories-list.html',
      link: function(scope, el, attrs) {
        return CategoryService.index().then(function(categories) {
          scope.categories = categories;
          return SwiperFacade.init(scope);
        });
      }
    };
  }
]);

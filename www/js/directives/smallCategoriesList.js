app.directive('smallCategoriesList', [
  'CategoryService', function(CategoryService) {
    return {
      templateUrl: 'templates/directives/small-categories-list.html',
      link: function(scope, el, attrs) {
        return CategoryService.index().then(function(categories) {
          return scope.categories = categories;
        });
      }
    };
  }
]);

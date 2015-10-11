app.directive('smallCategoriesList', function() {
  return {
    templateUrl: 'templates/directives/small-categories-list.html',
    link: function(scope, el, attrs) {
      return console.log('aqui');
    }
  };
});

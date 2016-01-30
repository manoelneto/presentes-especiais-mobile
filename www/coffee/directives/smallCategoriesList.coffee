app.directive 'smallCategoriesList', [ 'CategoryService', (CategoryService) ->

  templateUrl: 'templates/directives/small-categories-list.html'
  link: (scope, el, attrs) ->

    CategoryService.index().then (categories) ->
      scope.categories = categories
]

app.directive 'smallCategoriesList', [ 'CategoryService', 'SwiperFacade', (CategoryService, SwiperFacade) ->

  templateUrl: 'templates/directives/small-categories-list.html'

  link: (scope, el, attrs) ->

    CategoryService.index().then (categories) ->
      scope.categories = categories

      SwiperFacade.init(scope)
]

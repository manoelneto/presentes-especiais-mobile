app.service 'CategoryService', [ 'Service', 'Category', 'API', '$http', '$q', '$timeout', (Service, Category, API, $http, $q, $timeout) ->
  class CategoryService extends Service

    @baseUrl = "#{API.spree_base}/categories"

    @modelClass = Category

    @plural_resource_name = ->
      'categories'

  CategoryService
]

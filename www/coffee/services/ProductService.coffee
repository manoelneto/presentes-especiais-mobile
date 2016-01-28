app.service 'ProductService', [ 'Service', 'Product', 'API', '$http', '$q', '$timeout', (Service, Product, API, $http, $q, $timeout) ->
  class ProductService extends Service

    @baseUrl = "#{API.spree_base}/products"

    @modelClass = Product

    @plural_resource_name = ->
      'products'

  ProductService
]

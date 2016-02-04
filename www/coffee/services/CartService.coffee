app.service 'CartService', [ 'Service', 'API', '$http', '$q', '$timeout', (Service, API, $http, $q, $timeout) ->
  class CartService extends Service

    @baseUrl = "#{API.spree_base}/carts"

    # @modelClass = Chart

    @plural_resource_name = ->
      'carts'

  CartService
]

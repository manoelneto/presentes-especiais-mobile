app.service 'CartItemService', [ 'Service', 'API', '$http', '$q', 'CartItem',
  (Service, API, $http, $q, CartItem) ->

    class CartItemService extends Service

      @baseUrl = "#{API.spree_base}/cart_items"

      @modelClass = CartItem

      @plural_resource_name = ->
        'cart_items'

      @getCount = ->
        $q (resolve, reject) =>
          options = angular.extend {}, @getHeaders(), {
            url: "#{@baseUrl}/count.json"
            method: 'get'
          }
          $http options
            .then (response) =>
              resolve(response.data.count)

            .catch ->
              reject()



    CartItemService
]

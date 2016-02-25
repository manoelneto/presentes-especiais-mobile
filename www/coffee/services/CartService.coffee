app.service 'CartService', [ 'Service', 'API', '$http', '$q', 'Cart',
  (Service, API, $http, $q, Cart) ->
    cartResponse = {
      cart_items: [
        {
          name: "Bolsa item x"
          quantity: 1
          price: 10000
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        },
        {
          name: "outra bolsa"
          quantity: 1
          price: 10000
          image: "http://localhost:3000/spree/products/23/small/ror_bag.jpeg?1449019362"
        },
      ]
    }

    class CartService extends Service

      @baseUrl = "#{API.spree_base}/carts"

      # @modelClass = Chart

      @plural_resource_name = ->
        'carts'

      @getUserCart = ->
        # pega a resposta do servidor
        $q (resolve, reject) =>
          options = angular.extend {}, @getHeaders(), {
            url: "#{@baseUrl}/user_cart.json"
            method: 'get'
          }
          $http options
            .then (response) =>
              item = @getItenFromResponse response
              item = new Cart(item)

              console.log item

              resolve(item)

            .catch ->
              reject()


      # @delete = (cartItem) ->
      #   # deleta o cart item no servidor
      #   $q (resolve, reject) ->
      #     resolve()


    CartService
]

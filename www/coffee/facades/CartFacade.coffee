app.factory 'CartFacade', [ '$q', '$rootScope', 'CartService', 'CartItemService',
  '$location',
  ($q, $rootScope, CartService, CartItemService, $location) ->

    cartQuantity = 2

    refreshAllCartListeners = ->
      $rootScope.$broadcast 'CartFacade.cartQuantityChanged'

    incrementCartQuantity = ->
      cartQuantity++

      # informa a quem interessar que o numero de itens no cartão
      # foi alterado.
      refreshAllCartListeners()

    decrementCartQuantity = ->
      cartQuantity--

      # informa a quem interessar que o numero de itens no cartão
      # foi alterado.
      refreshAllCartListeners()

    getCartQuantity: ->
      CartItemService.getCount()

    getUserCart: ->
      CartService.getUserCart()

    addItemToCart: (product, userPer, quantity, price) ->
      $q (resolve, reject) ->
        params = {
          spree_product_id: product.getId(),
          price: price,
          quantity: quantity,
        }

        if userPer
          angular.extend params, {user_per_id: userPer.getId()}

        CartItemService.create(params).then ->
          incrementCartQuantity()
          resolve(arguments...)
        .catch ->
          reject(arguments...)

    addProductToCart: (product) ->
      @addItemToCart(product, null, 1, product.getPriceInCents())

    delete: (cartItem) ->
      # deleta item do carrinho do servidor
      CartItemService.delete(cartItem.getId()).then ->
        # deleta localmente
        cart = cartItem.getCart()
        cart.deleteCartItem(cartItem)

        # decrementa
        decrementCartQuantity()

    goToCart: ->
      $location.path("/carrinho")

]

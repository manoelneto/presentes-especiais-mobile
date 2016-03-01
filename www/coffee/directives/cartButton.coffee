app.directive 'cartButton', [ 'CartFacade', (CartFacade)->

  templateUrl: 'templates/directives/cart-button.html'

  link: (scope, el, attrs) ->
    scope.cartQuantity = '...'

    refreshCartButtonCounter = ->
      CartFacade.getCartQuantity().then (qtt) ->
        scope.cartQuantity = qtt

    # pegue a quantidade de itens no carrinho
    refreshCartButtonCounter()

    # quando o número de itens no carrinho mudar, atualize o contador
    scope.$on 'CartFacade.cartQuantityChanged', refreshCartButtonCounter
]

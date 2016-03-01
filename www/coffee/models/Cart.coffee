app.factory "Cart", [ 'Model', 'CartItem', (Model, CartItem) ->

  class Cart extends Model

    constructor: ->
      super

      self = @
      @attributes.cart_items ||= []
      @cartItens = @attributes.cart_items.map (cart_item) ->
        angular.extend cart_item, {cart: self}
        new CartItem(cart_item)

    getCartItens: ->
      @cartItens

    deleteCartItem: (cartItem)->
      @cartItens = @cartItens.filter (ci) ->
        ci != cartItem


  Cart
]

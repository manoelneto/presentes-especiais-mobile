app.factory "CartItem", [ 'Model', 'Product', (Model, Product) ->

  class CartItem extends Model

    constructor: ->
      super
      @product = new Product(@get('spree_product'))

    getName: ->
      # delegate to producr
      @product.get 'name'

    getProductImage: ->
      @product.getSmallImage()

    getPriceInReal: ->
      price = @get 'price'
      price / 100

    getCart: ->
      @get 'cart'

  CartItem
]

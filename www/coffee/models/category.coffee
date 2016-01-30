app.factory "Category", [ 'Model', 'API', 'Product', (Model, API, Product) ->

  class Category extends Model

    getName: ->
      @attributes.name

    getUrl: ->
      "/categorias/#{@attributes.id}"

    getProducts: ->
      if not @products
        @products = @attributes.products.map (product) ->
          new Product(product)

      @products

    getSmallImage: ->
      return "#{API.base_image_url}#{@attributes.picture_small_thumb}"

  Category
]

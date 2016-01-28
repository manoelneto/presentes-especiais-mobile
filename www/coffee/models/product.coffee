app.factory "Product", [ 'Model', 'API', (Model, API) ->

  class Product extends Model

    getName: ->
      @attributes.name

    getSmallImage: ->
      images = @attributes.master.images.map (image) ->
        "#{API.base_image_url}#{image.product_url}"

      return images[0]

  Product
]

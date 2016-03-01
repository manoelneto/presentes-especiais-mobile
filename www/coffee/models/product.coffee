app.factory "Product", [ 'Model', 'API', (Model, API) ->

  class Product extends Model

    getName: ->
      @get 'name'

    getThemes: ->
      @get 'themes'

    getPrice: ->
      @get 'price'

    getPriceInCents: ->
      parseInt(@get('price').replace('.', ''))

    canPersonalizate: ->
      @get 'has_personalization'

    getSmallImage: ->
      images = @attributes.master.images.map (image) ->
        "#{API.base_image_url}#{image.product_url}"

      return images[0]

    getPersonalizationUrl: ->
      "#/produtos/#{@attributes.id}/personalizar"

  Product
]

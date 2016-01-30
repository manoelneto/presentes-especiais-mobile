app.factory "Category", [ 'Model', 'API', (Model, API) ->

  class Category extends Model

    getName: ->
      @attributes.name

    getSmallImage: ->
      return "#{API.base_image_url}#{@attributes.picture_small_thumb}"

  Category
]

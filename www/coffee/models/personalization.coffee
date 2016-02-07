app.factory "Personalization", [ 'Model', 'Layout', 'API', (Model, Layout, API) ->

  class Personalization extends Model

    constructor: ->
      super

      @layouts = @attributes.layouts.map (layout) ->
        new Layout(layout)

    getLayouts: ->
      @layouts

    getBackgroundUrl: ->
      API.base_image_url + @attributes.picture_area_bg

    getId: ->
      @attributes.id

  Personalization
]

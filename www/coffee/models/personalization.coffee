app.factory "Personalization", [ 'Model', 'Layout', (Model, Layout) ->

  class Personalization extends Model

    constructor: ->
      super

      @layouts = @attributes.layouts.map (layout) ->
        new Layout(layout)

    getLayouts: ->
      @layouts

  Personalization
]

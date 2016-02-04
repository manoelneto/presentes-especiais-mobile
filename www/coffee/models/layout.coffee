app.factory "Layout", [ 'Model', 'AreaEdition', (Model, AreaEdition) ->

  class Layout extends Model

    constructor: ->
      super

      @area_editions = @attributes.area_editions.map (area_edition) ->
        new AreaEdition(area_edition)

    getAreaEditions: ->
      @area_editions

  Layout
]

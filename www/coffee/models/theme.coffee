app.factory "Theme", [ 'Model', 'Personalization', (Model, Personalization) ->

  class Theme extends Model

    constructor: ->
      super

      @personalizations = @attributes.personalizations.map (personalization) ->
        new Personalization(personalization)

    getPersonalizations: ->
      @personalizations

    getName: ->
      @attributes.name

  Theme
]

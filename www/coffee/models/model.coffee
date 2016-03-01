# Todos os models devem estender dessa classe

app.factory "Model", ->

  class Model

    # save attributes
    constructor: (attributes) ->
      @attributes = attributes

    get: (attribute) ->
      @attributes[attribute]

    getId: ->
      @get 'id'

    isNew: ->
      !@getId()

  Model

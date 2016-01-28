# Todos os models devem estender dessa classe

app.factory "Model", [ ->

  class Model

    # save attributes
    constructor: (attributes) ->
      @attributes = attributes

  Model
]

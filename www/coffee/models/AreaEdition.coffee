app.factory "AreaEdition", [ 'Model', (Model) ->
  baseSize = 500
  baseSizePercent = baseSize / 100

  class AreaEdition extends Model

    constructor: ->
      super

      @setPicture @attributes.picture
      @setText @attributes.text

    getCss: ->
      a = @attributes
      css = "top: #{a.y1 / baseSizePercent}%; left: #{a.x1 / baseSizePercent}%;"
      css = "#{css} width: #{(a.x2 - a.x1) / baseSizePercent}%;"
      css = "#{css} height: #{(a.y2 - a.y1) / baseSizePercent}%;"
      css

    getAreaTypeName: ->
      if @isImage()
        "Imagem"
      else if @isText()
        "Texto"

    setPicture: (picture) ->
      @picture = picture

    getPicture: ->
      @picture

    getType: ->
      if @isImage()
        "photo"
      else if @isText()
        "texto"

    isImage: ->
      @attributes.area_type = 'image'

    isText: ->
      @attributes.area_type = 'text'

    setText: (text) ->
      @text = text

    getText: ->
      @text

    hasData: ->
      !!@picture or !!@text

  AreaEdition

]

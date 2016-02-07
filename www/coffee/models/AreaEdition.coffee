app.factory "AreaEdition", [ 'Model', (Model) ->
  baseSize = 500
  baseSizePercent = baseSize / 100

  class AreaEdition extends Model

    constructor: ->
      super

    getCss: ->
      a = @attributes
      css = "top: #{a.y1 / baseSizePercent}%; left: #{a.x1 / baseSizePercent}%;"
      css = "#{css} width: #{(a.x2 - a.x1) / baseSizePercent}%;"
      css = "#{css} height: #{(a.y2 - a.y1) / baseSizePercent}%;"
      css

    getId: ->
      @attributes.id

    getWidth: ->
      @attributes.x2 -  @attributes.x1

    getHeight: ->
      @attributes.y2 -  @attributes.y1

    getWidthPercent: ->
      (@getWidth() / baseSize) * 100

    getHeightPercent: ->
      (@getHeight() / baseSize) * 100

    getAreaTypeName: ->
      if @isImage()
        "Imagem"
      else if @isText()
        "Texto"

    getPlaceholderIconUrl: ->
      if @isImage()
        "img/camera.png"
      else if @isText()
        "img/pencil.png"

    getType: ->
      if @isImage()
        "photo"
      else if @isText()
        "text"

    isImage: ->
      @attributes.area_type == 'image'

    isText: ->
      @attributes.area_type == 'text'

    isRequired: ->
      @attributes.required

  AreaEdition

]

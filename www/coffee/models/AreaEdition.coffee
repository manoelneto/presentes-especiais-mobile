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

    setPicture: (picture) ->
      @picture = picture

    getPicture: ->
      @picture

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

    setText: (text) ->
      @text = text

    getText: ->
      @text

    hasData: ->
      if @isImage()
        !!@picture
      else if @isText()
        !!@text
      else
        false

    removeData: ->
      console.log "removing #{@getType()}"
      if @isImage()
        @picture = null
      else if @isText()
        @text = null

  AreaEdition

]

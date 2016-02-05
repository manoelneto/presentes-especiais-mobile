app.factory "AreaEdition", [ 'Model', (Model) ->
  baseSize = 500
  baseSizePercent = baseSize / 100

  class AreaEdition extends Model

    getCss: ->
      a = @attributes
      css = "top: #{a.y1 / baseSizePercent}%; left: #{a.x1 / baseSizePercent}%;"
      css = "#{css} width: #{(a.x2 - a.x1) / baseSizePercent}%;"
      css = "#{css} height: #{(a.y2 - a.y1) / baseSizePercent}%;"
      css

    getAreaTypeName: ->
      if @attributes.area_type == 'image'
        "Imagem"
      else
        "Texto"

  AreaEdition

]

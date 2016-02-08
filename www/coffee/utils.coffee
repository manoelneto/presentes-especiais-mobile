app.factory "Utils", [ ->

  # split/chunck array arr into arrays of quantity
  chunckBy: (quantity, arr) ->
    result = []
    aux = []

    arr.forEach (value) ->
      aux.push value

      if aux.length == quantity
        result.push aux
        aux = []

    if aux.length > 0
      result.push aux

    result

  # split/chunck array arr into arrays of 2
  chunckByTwo: (arr) ->
    @chunckBy 2, arr
]

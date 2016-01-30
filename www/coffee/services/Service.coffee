# Todos os services devem estender dessa classe

app.factory "Service", [ '$http', '$q', ($http, $q) ->

  class Service
    # implements this

    # url for being base
    # example "#{API.base}/users"
    @baseUrl = ""

    # example UserModel
    @modelClass = ""

    # responsable to getAll objects in system
    @index = ->
      $q (resolve, reject) =>

        $http.get "#{@baseUrl}.json"
          .then (response) =>
            itens = @getItensFromResponse response
            itens = itens.map (item) =>
              new @modelClass(item)

            resolve(itens)

          .catch ->
            reject()

    # responsable to get a single object passing an id
    @find = (id) ->
      $q (resolve, reject) =>

        $http.get "#{@baseUrl}/#{id}.json"
          .then (response) =>
            item = @getItenFromResponse response
            item = new @modelClass(item)

            resolve(item)

          .catch ->
            reject()

    # get itens from response
    # this get response.data.PLURAL_RESOURCE
    # if plural resource is products,
    # this will get response.data.products
    @getItensFromResponse = (response) ->
      response.data[@plural_resource_name()]

    # get single item from response
    # this get response.data
    @getItenFromResponse = (response) ->
      response.data

    # define plural resource
    @plural_resource_name = ->
      throw "Please implement getItensFromResponse"

  Service
]

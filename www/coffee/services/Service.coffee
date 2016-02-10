# Todos os services devem estender dessa classe

app.factory "Service", [ '$http', '$q', 'User', ($http, $q, User) ->

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

        options = angular.extend {}, @getHeaders(), {
          url: "#{@baseUrl}.json"
          method: 'get'
        }
        $http options
          .then (response) =>
            itens = @getItensFromResponse response
            itens = itens.map (item) =>
              new @modelClass(item)

            resolve(itens)

          .catch ->
            console.log JSON.stringify arguments
            reject()

    # responsable to get a single object passing an id
    @find = (id) ->
      $q (resolve, reject) =>

        options = angular.extend {}, @getHeaders(), {
          url: "#{@baseUrl}/#{id}.json"
          method: 'get'
        }
        $http options
          .then (response) =>
            item = @getItenFromResponse response
            item = new @modelClass(item)

            resolve(item)

          .catch ->
            reject()

    # responsable to create object in system
    @create = (params) ->
      $q (resolve, reject) =>

        options = angular.extend {}, @getHeaders(), {
          url: "#{@baseUrl}.json"
          method: 'post'
          data: params
        }
        console.dir options

        $http options
          .then (response) =>
            item = @getItenFromResponse response
            item = new @modelClass(item)

            resolve(item)

          .catch ->
            console.log JSON.stringify arguments
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

    # get connection headers
    @getHeaders = ->
      headers = {}
      if User.current_user and User.current_user.spree_api_key
        angular.extend headers, {'X-Spree-Token': User.current_user.spree_api_key}
      headers: headers


  Service
]

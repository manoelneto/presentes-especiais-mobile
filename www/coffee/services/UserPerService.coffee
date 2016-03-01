app.service 'UserPerService', [ 'Service', 'UserPer', 'API', '$http', '$q', '$timeout', (Service, UserPer, API, $http, $q, $timeout) ->
  class UserPerService extends Service

    @baseUrl = "#{API.spree_base}/user_pers"

    @modelClass = UserPer

    @plural_resource_name = ->
      'user_pers'

  UserPerService
]

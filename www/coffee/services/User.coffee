app.service 'User', [ '$http', 'API', ($http, API) ->
    this.sign_in = (params) ->
        $http.post "#{API.base}/users/sign_in.json", user: params

    this
]
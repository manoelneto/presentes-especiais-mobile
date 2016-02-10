app.service 'User', [ '$http', 'API', ($http, API) ->
    this.fbResponse = null

    # fakeando os dados de usuário logado
    this.current_user =
      email: "contato@manoelneto.com"
      id: 2
      spree_api_key: "d079984189df9a9221faa50915a0cd8164e93ae8fecbb596"

    this.signIn = (params) ->
        $http.post "#{API.base}/users/sign_in.json", user: params

    this.create = (params) ->
        $http.post "#{API.base}/users.json", user: params

    this.hasEmail = (email) ->
        $http.get "#{API.base}/users/has_email.json",
            params:
                email: email

    this.loginWithFbToken = (token) ->
        $http.get "#{API.system_base}/users/auth/facebook_access_token/callback?format=json&access_token=#{token}",

    this
]

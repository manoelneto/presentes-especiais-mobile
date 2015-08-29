app.service 'User', [ '$http', 'API', ($http, API) ->
    this.fbResponse = null
    
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
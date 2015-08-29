app.service 'FB', [ '$http', ($http) ->

    FB_GRAPH_BASE = 'https://graph.facebook.com/v2.4'

    this.me = ->
        $http.get "#{FB_GRAPH_BASE}/me", {
            params:
                access_token: this.accessToken
                fields: 'picture.type(large),first_name,last_name,middle_name,email'
        }
            .then (response) ->
                response.data

    this
]
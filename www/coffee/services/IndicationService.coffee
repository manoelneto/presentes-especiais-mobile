app.service 'IndicationService', [ '$http', '$q', '$timeout', ($http, $q, $timeout) ->

    posts = [
        {
            message: "Bora trabalharrr"
        },

        {
            message: "Teste de mensagem"
        },
    ]

    this.loadPostsFaked = ->
        $q (resolve, reject) ->
            theReponse = {
                data: {
                    data: posts
                }
            }

            $timeout ->
                resolve(theReponse)
            , 5000


    url = "https://graph.facebook.com/v2.5/paginademusicaelife/posts?access_token=CAACEdEose0cBANIKWR2v3789mjAxojCYKWwJX7aZCdvk9mZBur8GfDsYU0vGE9kEeFCtePPd8fsiSz8QdsjyUv7c2djARdl8emuSTHKhIkMRTWgc69BdxlQAC0w1vn0RNroeTBxQcLkiItvFUn0wMVO7SaFdWFTNzBaD4ZCCOPWKxwi4LPyCPDm7pTeWnCZAbvowv4sTP7Az8HxRmI44"

    this.loadPosts = ->
        $http.get url

    return this
]

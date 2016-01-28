= Service e Factory

= Uso geral

Se você quer chamar alguma api, você deve utilizar a service, por exemplo

UserController
```
app.controller 'UserCtrl', ['$scope', 'User', ($scope, User) ->

    $scope.loadUsers = ->
      UserService.loadAll().then (response) ->
        $scope.users = response

]
```

UserService
```
app.service 'UserService', [ '$http', 'API', ($http, API) ->
    this.loadAll = ->
      $http.get "#{API.base}/users.json"

    this
]
```

Então o fluxo geral sempre vai ser: Controller -> Service -> Outros sistemas, ou Diretica -> Service -> outros sitemas.

= Service

Service são objetos utilizados frequentemente pelos controllers ou por qualquer entidade que deseje utilizar. São utilizados para encapsular regras de negócios, acesso ao sistemas remotos, etc, como por exemplo, o backend.

Cada service é chamado como um new Service, onde ele é um singletom. Então, qualquer chamada resulta no mesmo objeto.

== Exemplo

```
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
```

= Factory

Factory servem pra a mesma coisa, a diferença é que você retorna qualquer objeto, não é instanciado com o new como o service é, mas ambos são singletons

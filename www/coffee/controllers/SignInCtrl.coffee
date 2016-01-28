app.controller 'SignInCtrl', [ '$scope', '$state', 'User', 'FB', '$openFB', ($scope, $state, User, FB, $openFB) ->

    $scope.UserService = User
    $scope.user = {}

    $scope.login = ->
      $scope.login_error = null
      User.signIn $scope.user
        .then (response) ->
          User.current_user = response.data
          alert "Login realizado com sucesso, token -> #{response.data.spree_api_key}"

        .catch (response) ->
          $scope.login_error = "Credenciais Inválidas"

    $scope.facebookLogin = ->
      loginPromise = $openFB.login scope: 'email'

      loginPromise.then (accessToken) ->

        FB.accessToken = accessToken

        User.loginWithFbToken accessToken
          .then (response) ->
            User.current_user = response.data

          .catch (response) ->
            FB.me().then (response) ->
              User.fbResponse = response
              $state.go 'registration_new'
            .catch (response) ->

        .catch (response) ->

]

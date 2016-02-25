app.controller 'SignInCtrl', [ '$scope', '$state', 'User', 'FB', '$openFB', ($scope, $state, User, FB, $openFB) ->

    $scope.UserService = User
    $scope.user = {}
    $scope.loading = false

    $scope.login = ->
      $scope.loading = true
      $scope.login_error = null
      User.signIn $scope.user
        .then (response) ->
          User.current_user = response.data
          $state.go "products_index"

        .catch (response) ->
          $scope.login_error = "Credenciais Inválidas"

        .finally ->
          $scope.loading = false

    $scope.facebookLogin = ->
      $scope.loading = true
      loginPromise = $openFB.login scope: 'email'

      loginPromise.then (accessToken) ->

        FB.accessToken = accessToken

        User.loginWithFbToken accessToken
          .then (response) ->
            User.current_user = response.data
            $state.go "products_index"

          .catch (response) ->
            FB.me().then (response) ->
              User.fbResponse = response
              $state.go 'registration_new'
            .catch (response) ->
              alert "Houve um erro ao pegar dados do facebook"
            .finally ->
              $scope.loading = false

          .finally ->
            $scope.loading = false

        .catch (response) ->
          $scope.loading = false

]

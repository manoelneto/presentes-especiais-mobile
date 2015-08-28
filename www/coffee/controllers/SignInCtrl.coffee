app.controller 'SignInCtrl', [ '$scope', '$state', 'User', ($scope, $state, User) ->

    $scope.user =
        email: 'contato@manoelneto.com'
        password: '12345678'

    $scope.login = ->
        $scope.login_error = null
        User.sign_in $scope.user
            .then (response) ->
                User.current_user = response.data
            .catch (response) ->
                $scope.login_error = "Credenciais Inválidas"

    # $scope.createAccount = ->
    #   $state.go 'create-account'
]
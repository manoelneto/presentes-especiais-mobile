app.controller 'RegistrationNewCtrl', [ '$scope', '$state', 'User', ($scope, $state, User) ->

    if User.fbResponse
        $scope.user =
            first_name: User.fbResponse.first_name
            last_name: "#{User.fbResponse.middle_name} #{User.fbResponse.last_name}"
            email: User.fbResponse.email
            image_url: User.fbResponse.picture.data.url
            identities_attributes: [
                {
                    provider: 'facebook'
                    uid: User.fbResponse.id
                }
            ]
    else
        $scope.user = {}

    $scope.checkEmailAPI = (email) ->
        User.hasEmail email
            .then (response) ->
                $scope.has_email = response.data

    $scope.signUp = ->
        $scope.has_email = false
        User.create $scope.user
            .then (response) ->
                User.current_user = response.data
                alert "Usuário cadastrado com sucesso"
            .catch (response) ->
                if response.data.email
                    $scope.has_email = true
                else
                    alert "Houve um erro ao conectar com o servidor"

    # $scope.createAccount = ->
    #   $state.go 'create-account'
]
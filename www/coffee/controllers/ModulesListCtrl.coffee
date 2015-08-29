app.controller 'ModulesListCtrl', ['$scope', '$state', 'User', ($scope, $state, User) ->

    $scope.logout = ->
        User.current_user = null
        $state.go 'index'
]
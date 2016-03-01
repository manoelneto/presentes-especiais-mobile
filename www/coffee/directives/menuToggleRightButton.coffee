app.directive 'menuToggleRightButton', ['User', '$state', (User, $state)->

  templateUrl: 'templates/directives/menu-toggle-right-button.html'
  link: (scope, el, attrs) ->

    scope.logout = ->
      User.current_user = null
      $state.go 'login'


]

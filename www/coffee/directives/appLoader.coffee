app.directive 'appLoader', [->

  scope:
    model: "="

  templateUrl: 'templates/directives/app-loader.html'

  link: (scope, el, attrs) ->

    scope.getClass = ->

      if scope.model
        "show"
      else
        ""

]

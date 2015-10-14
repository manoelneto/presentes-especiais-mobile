app.directive 'topBarLight', ->

  link: (scope, el, attrs) ->

    if window.StatusBar
      StatusBar.style(1)

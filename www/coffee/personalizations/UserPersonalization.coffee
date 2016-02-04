app.factory 'UserPersonalization', ['Utils', 'Theme', (Utils, Theme) ->

  class UserPersonalization

    constructor: (themes) ->
      @themes = themes.map (theme) ->
        new Theme(theme)
      @listeners = []

    onChange: (item, callback) ->
      @listeners.push item: item, callback: callback

    setTheme: (theme) ->
      @theme = theme
      @notifyListeners 'theme', theme

    setPersonalization: (personalization) ->
      @personalization = personalization
      @notifyListeners 'personalization', personalization

    setLayout: (layout) ->
      @layout = layout
      @notifyListeners 'layout', layout

    setDefault: ->
      # Utils.sortByKey @themes, 'default'
      @setTheme @themes[0]
      @setPersonalization @theme.getPersonalizations()[0]
      @setLayout @personalization.getLayouts()[0]

    notifyListeners: (item, object) ->
      @listeners.filter (listener) ->
        listener.item == item
      .forEach (listener) ->
        listener.callback object


  UserPersonalization

]

app.factory 'UserPersonalization', ['Utils', 'Theme', (Utils, Theme) ->

  class UserPersonalization

    constructor: (themes) ->
      @themes = themes.map (theme) ->
        new Theme(theme)
      @listeners = []

    getThemes: ->
      @themes

    onChange: (item, callback) ->
      @listeners.push item: item, callback: callback

    setTheme: (theme) ->
      @theme = theme
      @notifyListeners 'theme', theme

    setPersonalization: (personalization) ->
      @personalization = personalization
      @setLayout @personalization.getLayouts()[0]
      @notifyListeners 'personalization', personalization
      @notifyListeners 'layout', @layout

    setPersonalizations: (personalizations) ->
      @personalizations = personalizations
      @notifyListeners 'personalizations', personalizations

    setLayout: (layout) ->
      @layout = layout
      @notifyListeners 'layout', layout

    setDefault: ->
      # Utils.sortByKey @themes, 'default'
      @setTheme @themes[0]
      @setPersonalization @theme.getPersonalizations()[0]
      orderedPersonalizations = @theme.personalizations
      @setPersonalizations orderedPersonalizations

    isLastPersonalization: (personalization) ->
      if @personalizations
        return @personalizations[@personalizations.length - 1] == personalization

      return false

    isFirstPersonalization: (personalization) ->
      if @personalizations
        return @personalizations[0] == personalization

      return false

    setPrevPersonalization: (currentPersonalization) ->
      nextIndex = @personalizations.indexOf(currentPersonalization) - 1

      if nextIndex < 0
        nextIndex = 0

      @setPersonalization @personalizations[nextIndex]

    setNextPersonalization: (currentPersonalization) ->
      nextIndex = @personalizations.indexOf(currentPersonalization) + 1

      if nextIndex > @personalizations.length
        nextIndex = @personalizations.length

      @setPersonalization @personalizations[nextIndex]

    notifyListeners: (item, object) ->
      @listeners.filter (listener) ->
        listener.item == item
      .forEach (listener) ->
        listener.callback object


  UserPersonalization

]

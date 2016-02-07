app.factory 'UserPersonalization', ['Utils', 'Theme', (Utils, Theme) ->

  class UserPersonalization

    hasCompleted: ->
      completed = true
      @theme.getPersonalizations().forEach (personalization) =>
        if @hasInternalLayoutFor personalization
          layout = @getInternalLayout personalization
        else
          layout = personalization.getLayouts()[0]

        console.dir layout

        layout.getAreaEditions().forEach (areaEdition) =>
          if areaEdition.isRequired() and not @hasData(areaEdition)
            completed = false

      completed


    constructor: (themes) ->
      @personalizations_layout = {}
      @areaEditionData = {}
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

      @setPersonalization @theme.getPersonalizations()[0]
      orderedPersonalizations = @theme.personalizations
      @setPersonalizations orderedPersonalizations

    hasInternalLayoutFor: (personalization) ->
      !! @getInternalLayout personalization

    getInternalLayout: (personalization) ->
      @personalizations_layout[personalization.getId()]

    setInternalLayoutForPersonalization: (personalization, layout) ->
      @personalizations_layout[personalization.getId()] = layout

    setPersonalization: (personalization) ->
      @personalization = personalization
      @notifyListeners 'personalization', personalization
      if not @hasInternalLayoutFor @personalization
        @setLayout @personalization, @personalization.getLayouts()[0]
      else
        @setLayout @personalization, @getInternalLayout(@personalization)

    setPersonalizations: (personalizations) ->
      @personalizations = personalizations
      @notifyListeners 'personalizations', personalizations

    setLayout: (personalization, layout) ->
      @setInternalLayoutForPersonalization personalization, layout
      @layout = layout
      @notifyListeners 'layout', layout

    setDefault: ->
      # Utils.sortByKey @themes, 'default'
      @setTheme @themes[0]

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

    setData: (areaEdition, data) ->
      @areaEditionData[areaEdition.getId()] = data

    getData: (areaEdition) ->
      @areaEditionData[areaEdition.getId()]

    hasData: (areaEdition) ->
      !!@getData(areaEdition)

    removeData: (areaEdition) ->
      @areaEditionData[areaEdition.getId()] = null

  UserPersonalization

]

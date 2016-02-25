app.factory('UserPersonalization', [
  'Utils', 'Theme', function(Utils, Theme) {
    var UserPersonalization;
    UserPersonalization = (function() {
      UserPersonalization.prototype.getCreateParams = function() {
        var params, personalizationsParams;
        personalizationsParams = [];
        this.theme.getPersonalizations().forEach((function(_this) {
          return function(personalization) {
            var layout, personalizationParam;
            layout = _this.getLayoutFor(personalization);
            personalizationParam = {
              personalization_id: personalization.getId(),
              layout_id: layout.getId(),
              user_area_pers_attributes: []
            };
            layout.getAreaEditions().forEach(function(areaEdition) {
              var areaParam;
              if (_this.hasData(areaEdition)) {
                areaParam = {
                  x1: areaEdition.getX1(),
                  x2: areaEdition.getX2(),
                  y1: areaEdition.getY1(),
                  y2: areaEdition.getY2(),
                  area_type: areaEdition.getType()
                };
                if (areaEdition.isImage()) {
                  angular.extend(areaParam, {
                    image: _this.getData(areaEdition)
                  });
                }
                if (areaEdition.isText()) {
                  angular.extend(areaParam, {
                    text: _this.getData(areaEdition)
                  });
                }
                return personalizationParam.user_area_pers_attributes.push(areaParam);
              }
            });
            return personalizationsParams.push(personalizationParam);
          };
        })(this));
        params = {
          theme_id: this.theme.getId(),
          user_per_pers_attributes: personalizationsParams
        };
        return params;
      };

      UserPersonalization.prototype.getLayoutFor = function(personalization) {
        var layout;
        if (this.hasInternalLayoutFor(personalization)) {
          return layout = this.getInternalLayout(personalization);
        } else {
          return layout = personalization.getLayouts()[0];
        }
      };

      UserPersonalization.prototype.hasCompleted = function() {
        var completed;
        completed = true;
        this.theme.getPersonalizations().forEach((function(_this) {
          return function(personalization) {
            var layout;
            layout = _this.getLayoutFor(personalization);
            if (layout === void 0) {
              return;
            }
            return layout.getAreaEditions().forEach(function(areaEdition) {
              if (areaEdition.isRequired() && !_this.hasData(areaEdition)) {
                return completed = false;
              }
            });
          };
        })(this));
        return completed;
      };

      function UserPersonalization(themes) {
        this.personalizations_layout = {};
        this.areaEditionData = {};
        this.themes = themes.map(function(theme) {
          return new Theme(theme);
        });
        this.listeners = [];
      }

      UserPersonalization.prototype.getThemes = function() {
        return this.themes;
      };

      UserPersonalization.prototype.onChange = function(item, callback) {
        return this.listeners.push({
          item: item,
          callback: callback
        });
      };

      UserPersonalization.prototype.setTheme = function(theme) {
        var orderedPersonalizations;
        this.theme = theme;
        this.notifyListeners('theme', theme);
        this.setPersonalization(this.theme.getPersonalizations()[0]);
        orderedPersonalizations = this.theme.personalizations;
        return this.setPersonalizations(orderedPersonalizations);
      };

      UserPersonalization.prototype.hasInternalLayoutFor = function(personalization) {
        return !!this.getInternalLayout(personalization);
      };

      UserPersonalization.prototype.getInternalLayout = function(personalization) {
        return this.personalizations_layout[personalization.getId()];
      };

      UserPersonalization.prototype.setInternalLayoutForPersonalization = function(personalization, layout) {
        return this.personalizations_layout[personalization.getId()] = layout;
      };

      UserPersonalization.prototype.setPersonalization = function(personalization) {
        this.personalization = personalization;
        this.notifyListeners('personalization', personalization);
        if (!this.hasInternalLayoutFor(this.personalization)) {
          return this.setLayout(this.personalization, this.personalization.getLayouts()[0]);
        } else {
          return this.setLayout(this.personalization, this.getInternalLayout(this.personalization));
        }
      };

      UserPersonalization.prototype.setPersonalizations = function(personalizations) {
        this.personalizations = personalizations;
        return this.notifyListeners('personalizations', personalizations);
      };

      UserPersonalization.prototype.setLayout = function(personalization, layout) {
        this.setInternalLayoutForPersonalization(personalization, layout);
        this.layout = layout;
        return this.notifyListeners('layout', layout);
      };

      UserPersonalization.prototype.setDefault = function() {
        return this.setTheme(this.themes[0]);
      };

      UserPersonalization.prototype.isLastPersonalization = function(personalization) {
        if (this.personalizations) {
          return this.personalizations[this.personalizations.length - 1] === personalization;
        }
        return false;
      };

      UserPersonalization.prototype.isFirstPersonalization = function(personalization) {
        if (this.personalizations) {
          return this.personalizations[0] === personalization;
        }
        return false;
      };

      UserPersonalization.prototype.setPrevPersonalization = function(currentPersonalization) {
        var nextIndex;
        nextIndex = this.personalizations.indexOf(currentPersonalization) - 1;
        if (nextIndex < 0) {
          nextIndex = 0;
        }
        return this.setPersonalization(this.personalizations[nextIndex]);
      };

      UserPersonalization.prototype.setNextPersonalization = function(currentPersonalization) {
        var nextIndex;
        nextIndex = this.personalizations.indexOf(currentPersonalization) + 1;
        if (nextIndex > this.personalizations.length) {
          nextIndex = this.personalizations.length;
        }
        return this.setPersonalization(this.personalizations[nextIndex]);
      };

      UserPersonalization.prototype.notifyListeners = function(item, object) {
        return this.listeners.filter(function(listener) {
          return listener.item === item;
        }).forEach(function(listener) {
          return listener.callback(object);
        });
      };

      UserPersonalization.prototype.setData = function(areaEdition, data) {
        return this.areaEditionData[areaEdition.getId()] = data;
      };

      UserPersonalization.prototype.getData = function(areaEdition) {
        return this.areaEditionData[areaEdition.getId()];
      };

      UserPersonalization.prototype.hasData = function(areaEdition) {
        return !!this.getData(areaEdition);
      };

      UserPersonalization.prototype.removeData = function(areaEdition) {
        return this.areaEditionData[areaEdition.getId()] = null;
      };

      return UserPersonalization;

    })();
    return UserPersonalization;
  }
]);

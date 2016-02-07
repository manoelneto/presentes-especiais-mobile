app.factory('UserPersonalization', [
  'Utils', 'Theme', function(Utils, Theme) {
    var UserPersonalization;
    UserPersonalization = (function() {
      function UserPersonalization(themes) {
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
        this.theme = theme;
        return this.notifyListeners('theme', theme);
      };

      UserPersonalization.prototype.setPersonalization = function(personalization) {
        this.personalization = personalization;
        this.setLayout(this.personalization.getLayouts()[0]);
        this.notifyListeners('personalization', personalization);
        return this.notifyListeners('layout', this.layout);
      };

      UserPersonalization.prototype.setPersonalizations = function(personalizations) {
        this.personalizations = personalizations;
        return this.notifyListeners('personalizations', personalizations);
      };

      UserPersonalization.prototype.setLayout = function(layout) {
        this.layout = layout;
        return this.notifyListeners('layout', layout);
      };

      UserPersonalization.prototype.setDefault = function() {
        var orderedPersonalizations;
        this.setTheme(this.themes[0]);
        this.setPersonalization(this.theme.getPersonalizations()[0]);
        orderedPersonalizations = this.theme.personalizations;
        return this.setPersonalizations(orderedPersonalizations);
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

      return UserPersonalization;

    })();
    return UserPersonalization;
  }
]);

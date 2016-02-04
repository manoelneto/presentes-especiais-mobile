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
        return this.notifyListeners('personalization', personalization);
      };

      UserPersonalization.prototype.setLayout = function(layout) {
        this.layout = layout;
        return this.notifyListeners('layout', layout);
      };

      UserPersonalization.prototype.setDefault = function() {
        this.setTheme(this.themes[0]);
        this.setPersonalization(this.theme.getPersonalizations()[0]);
        return this.setLayout(this.personalization.getLayouts()[0]);
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

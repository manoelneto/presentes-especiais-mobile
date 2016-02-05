var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

app.factory("AreaEdition", [
  'Model', function(Model) {
    var AreaEdition, baseSize, baseSizePercent;
    baseSize = 500;
    baseSizePercent = baseSize / 100;
    AreaEdition = (function(superClass) {
      extend(AreaEdition, superClass);

      function AreaEdition() {
        return AreaEdition.__super__.constructor.apply(this, arguments);
      }

      AreaEdition.prototype.getCss = function() {
        var a, css;
        a = this.attributes;
        css = "top: " + (a.y1 / baseSizePercent) + "%; left: " + (a.x1 / baseSizePercent) + "%;";
        css = css + " width: " + ((a.x2 - a.x1) / baseSizePercent) + "%;";
        css = css + " height: " + ((a.y2 - a.y1) / baseSizePercent) + "%;";
        return css;
      };

      AreaEdition.prototype.getAreaTypeName = function() {
        if (this.attributes.area_type === 'image') {
          return "Imagem";
        } else {
          return "Texto";
        }
      };

      return AreaEdition;

    })(Model);
    return AreaEdition;
  }
]);

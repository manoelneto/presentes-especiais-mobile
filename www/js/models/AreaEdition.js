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
        AreaEdition.__super__.constructor.apply(this, arguments);
        this.setPicture(this.attributes.picture);
        this.setText(this.attributes.text);
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
        if (this.isImage()) {
          return "Imagem";
        } else if (this.isText()) {
          return "Texto";
        }
      };

      AreaEdition.prototype.setPicture = function(picture) {
        return this.picture = picture;
      };

      AreaEdition.prototype.getPicture = function() {
        return this.picture;
      };

      AreaEdition.prototype.getType = function() {
        if (this.isImage()) {
          return "photo";
        } else if (this.isText()) {
          return "texto";
        }
      };

      AreaEdition.prototype.isImage = function() {
        return this.attributes.area_type = 'image';
      };

      AreaEdition.prototype.isText = function() {
        return this.attributes.area_type = 'text';
      };

      AreaEdition.prototype.setText = function(text) {
        return this.text = text;
      };

      AreaEdition.prototype.getText = function() {
        return this.text;
      };

      AreaEdition.prototype.hasData = function() {
        return !!this.picture || !!this.text;
      };

      return AreaEdition;

    })(Model);
    return AreaEdition;
  }
]);

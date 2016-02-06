app.factory("GalleryImageStrategy", [
  '$q', function($q) {
    var GalleryImageStrategy, defaultOptions;
    defaultOptions = {
      maximumImagesCount: 10,
      width: 800,
      height: 800,
      quality: 80
    };
    GalleryImageStrategy = (function() {
      function GalleryImageStrategy(options) {
        this.options = angular.extend({}, options, defaultOptions);
      }

      GalleryImageStrategy.prototype.loadPicture = function() {
        return $q(function(resolve, reject) {
          return imagePicker.getPictures(function(results) {
            var i;
            console.log(results);
            i = 0;
            while (i < results.length) {
              console.log('Image URI: ' + results[i]);
              i++;
            }
            return resolve(results);
          }, function(error) {
            console.log("error getting photos");
            return reject(error);
          }, this.options);
        });
      };

      return GalleryImageStrategy;

    })();
    return GalleryImageStrategy;
  }
]);

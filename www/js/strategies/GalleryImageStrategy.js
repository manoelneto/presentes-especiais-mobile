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
            var encodePromises, parsedFiles;
            parsedFiles = [];
            encodePromises = [];
            results.forEach(function(result) {
              var promise;
              promise = $q(function(r, rj) {
                return window.plugins.Base64.encodeFile(result, function(base64) {
                  parsedFiles.push(base64);
                  return r();
                });
              });
              return encodePromises.push(promise);
            });
            return $q.all(encodePromises).then(function() {
              return resolve(parsedFiles);
            });
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

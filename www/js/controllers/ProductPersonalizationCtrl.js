app.controller('ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', function($scope, $state, ProductService, UserPersonalization) {
    var createUserPersonalization, id;
    id = $state.params.id;
    ProductService.find(id).then(function(product) {
      $scope.product = product;
      return createUserPersonalization();
    });
    createUserPersonalization = function() {
      $scope.userPersonalization = new UserPersonalization($scope.product.getThemes());
      $scope.userPersonalization.onChange('personalization', function(personalization) {
        return $scope.personalization = personalization;
      });
      $scope.userPersonalization.onChange('theme', function(theme) {
        return $scope.theme = theme;
      });
      $scope.userPersonalization.onChange('layout', function(layout) {
        return $scope.layout = layout;
      });
      return $scope.userPersonalization.setDefault();
    };
    return $scope.imagePicker = function() {
      var options;
      console.log('runing image picker');
      options = {
        maximumImagesCount: 10,
        width: 800,
        height: 800,
        quality: 80
      };
      return imagePicker.getPictures(function(results) {
        var i;
        console.log(results);
        i = 0;
        while (i < results.length) {
          console.log('Image URI: ' + results[i]);
          i++;
        }
      }, function(error) {
        console.log("error getting photos");
      }, options);
    };
  }
]);

app.controller('ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', function($scope, $state, ProductService, UserPersonalization) {
    var createUserPersonalization, id;
    id = $state.params.id;
    ProductService.find(id).then(function(product) {
      $scope.product = product;
      return createUserPersonalization();
    });
    return createUserPersonalization = function() {
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
  }
]);

app.controller('ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', 'GalleryImageStrategy', '$timeout', function($scope, $state, ProductService, UserPersonalization, GalleryImageStrategy, $timeout) {
    var createUserPersonalization, id, imagePicker;
    id = $state.params.id;
    ProductService.find(id).then(function(product) {
      $scope.product = product;
      return createUserPersonalization();
    });
    createUserPersonalization = function() {
      var pThemes;
      pThemes = [
        {
          id: 17,
          name: 'Teste de tema',
          personalizations: [
            {
              id: 6,
              name: "Teste",
              order: null,
              picture_area_bg: "/uploads/personalization/picture/6/area_bg_pp.jpeg",
              layouts: [
                {
                  id: 6,
                  name: "teste de layout",
                  order: null,
                  area_editions: [
                    {
                      area_type: "image",
                      id: 18,
                      name: "imagem ao centro",
                      order: null,
                      required: false,
                      x1: 138,
                      x2: 337,
                      y1: 109,
                      y2: 263
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
      $scope.userPersonalization = new UserPersonalization(pThemes);
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
    $scope.loadAreaData = function(areaEdition) {
      if (areaEdition.isImage()) {
        return imagePicker(areaEdition);
      }
    };
    return imagePicker = function(areaEdition) {
      var galleryStrategy;
      galleryStrategy = new GalleryImageStrategy();
      return galleryStrategy.loadPicture().then(function(picture) {
        return $timeout(function() {
          return areaEdition.setPicture(picture);
        });
      })["catch"](function() {
        return console.log(arguments);
      });
    };
  }
]);

app.controller('ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', 'GalleryImageStrategy', '$timeout', '$jrCrop', '$ionicModal', function($scope, $state, ProductService, UserPersonalization, GalleryImageStrategy, $timeout, $jrCrop, $ionicModal) {
    var createUserPersonalization, id, imagePicker, openChangeImageModal, removeModal;
    id = $state.params.id;
    ProductService.find(id).then(function(product) {
      $scope.product = product;
      return createUserPersonalization();
    });
    createUserPersonalization = function() {
      var pThemes;
      pThemes = $scope.product.getThemes();
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
    openChangeImageModal = function(areaEdition) {
      $scope.modalItem = areaEdition;
      return $ionicModal.fromTemplateUrl('templates/modals/personalization-change-image.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        return modal.show();
      });
    };
    $scope.executeProperAction = function(areaEdition) {
      if (areaEdition.isImage()) {
        if (areaEdition.hasData()) {
          return openChangeImageModal(areaEdition);
        } else {
          return imagePicker(areaEdition);
        }
      }
    };
    $scope.modalChange = function() {
      var areaEdition;
      areaEdition = $scope.modalItem;
      if (areaEdition.isImage()) {
        $scope.modal.remove();
        return imagePicker(areaEdition);
      }
    };
    $scope.modalRemove = function() {
      var areaEdition;
      areaEdition = $scope.modalItem;
      areaEdition.removeData();
      return $scope.modal.remove();
    };
    removeModal = function() {
      return $scope.modal.remove();
    };
    $scope.modalCancel = removeModal;
    $scope.$on('$destroy', function() {
      return removeModal();
    });
    return imagePicker = function(areaEdition) {
      var galleryStrategy;
      if (!window.imagePicker) {
        areaEdition.setPicture('https://placeholdit.imgix.net/~text?txtsize=23&bg=bada55&txt=500%C3%97500&w=500&h=500');
        return;
      }
      galleryStrategy = new GalleryImageStrategy();
      return galleryStrategy.loadPicture().then(function(pictures) {
        if (pictures.length === 0) {
          return false;
        }
        return $jrCrop.crop({
          url: pictures[0],
          width: areaEdition.getWidth(),
          height: areaEdition.getHeight(),
          title: 'Corte sua imagem'
        }).then(function(canvas) {
          return $timeout(function() {
            return areaEdition.setPicture(canvas.toDataURL());
          });
        }, function() {
          console.log('some error');
          return console.log(arguments);
        });
      })["catch"](function() {
        return console.log(arguments);
      });
    };
  }
]);

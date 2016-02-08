var LayoutState, PersonalizationState, State, ThemeState,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

State = (function() {
  function State() {}

  State.prototype.getSection = function() {
    return this.section;
  };

  return State;

})();

PersonalizationState = (function(superClass) {
  extend(PersonalizationState, superClass);

  function PersonalizationState() {
    return PersonalizationState.__super__.constructor.apply(this, arguments);
  }

  PersonalizationState.prototype.section = 'personalization';

  PersonalizationState.prototype.clickLayoutButton = function() {
    return new LayoutState();
  };

  PersonalizationState.prototype.clickThemeButton = function() {
    return new ThemeState();
  };

  return PersonalizationState;

})(State);

LayoutState = (function(superClass) {
  extend(LayoutState, superClass);

  function LayoutState() {
    return LayoutState.__super__.constructor.apply(this, arguments);
  }

  LayoutState.prototype.section = 'layout';

  LayoutState.prototype.clickLayoutButton = function() {
    return new PersonalizationState();
  };

  LayoutState.prototype.clickThemeButton = function() {
    return new ThemeState();
  };

  return LayoutState;

})(State);

ThemeState = (function(superClass) {
  extend(ThemeState, superClass);

  function ThemeState() {
    return ThemeState.__super__.constructor.apply(this, arguments);
  }

  ThemeState.prototype.section = 'theme';

  ThemeState.prototype.clickLayoutButton = function() {
    return new LayoutState();
  };

  ThemeState.prototype.clickThemeButton = function() {
    return new PersonalizationState();
  };

  return ThemeState;

})(State);

app.controller('ProductPersonalizationCtrl', [
  '$scope', '$state', 'ProductService', 'UserPersonalization', 'GalleryImageStrategy', '$timeout', '$jrCrop', '$ionicModal', 'PersonalizationShare', function($scope, $state, ProductService, UserPersonalization, GalleryImageStrategy, $timeout, $jrCrop, $ionicModal, PersonalizationShare) {
    var createUserPersonalization, id, imagePicker, layoutChooseEnabled, openChangeImageModal, removeModal, themeChooseEnabled;
    id = $state.params.id;
    $scope.state = new PersonalizationState();
    $scope.chooseLayout = function() {
      if (layoutChooseEnabled()) {
        return $scope.state = $scope.state.clickLayoutButton();
      }
    };
    $scope.chooseTheme = function() {
      if (themeChooseEnabled()) {
        return $scope.state = $scope.state.clickThemeButton();
      }
    };
    layoutChooseEnabled = function() {
      if ($scope.personalization) {
        if ($scope.personalization.getLayouts().length > 1) {
          return true;
        }
      }
      return false;
    };
    $scope.layoutButtonClass = function() {
      var toReturn;
      toReturn = [];
      if ($scope.state.getSection() === 'layout') {
        toReturn.push('active');
      }
      if (!layoutChooseEnabled()) {
        toReturn.push('disabled');
      }
      return toReturn.join(' ');
    };
    themeChooseEnabled = function() {
      if ($scope.product) {
        if ($scope.product.getThemes().length > 1) {
          return true;
        }
      }
      return false;
    };
    $scope.themeButtonClass = function() {
      var toReturn;
      toReturn = [];
      if ($scope.state.getSection() === 'theme') {
        toReturn.push('active');
      }
      if (!themeChooseEnabled()) {
        toReturn.push('disabled');
      }
      return toReturn.join(' ');
    };
    $scope.setTheme = function(theme) {
      $scope.state = new PersonalizationState();
      return $scope.userPersonalization.setTheme(theme);
    };
    $scope.setLayout = function(layout) {
      $scope.state = new PersonalizationState();
      return $scope.userPersonalization.setLayout($scope.personalization, layout);
    };
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
    $scope.completePersonalization = function() {
      return $scope.userPersonalization.getCreateParams();
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
    $scope.prevPersonalization = function() {
      return $scope.userPersonalization.setPrevPersonalization($scope.personalization);
    };
    $scope.nextPersonalization = function() {
      return $scope.userPersonalization.setNextPersonalization($scope.personalization);
    };
    $scope.showPrevButton = function() {
      if ($scope.userPersonalization) {
        return !$scope.userPersonalization.isFirstPersonalization($scope.personalization);
      }
      return false;
    };
    $scope.showNextButton = function() {
      if ($scope.userPersonalization) {
        return !$scope.userPersonalization.isLastPersonalization($scope.personalization);
      }
      return false;
    };
    $scope.showCompleteButton = function() {
      if ($scope.userPersonalization) {
        return $scope.userPersonalization.isLastPersonalization($scope.personalization) && $scope.userPersonalization.hasCompleted();
      }
      return false;
    };
    $scope.executeProperAction = function(areaEdition) {
      if (areaEdition.isImage()) {
        if ($scope.userPersonalization.hasData(areaEdition)) {
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
      $scope.userPersonalization.removeData(areaEdition);
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
        $scope.userPersonalization.setData(areaEdition, 'https://placeholdit.imgix.net/~text?txtsize=23&bg=bada55&txt=500%C3%97500&w=500&h=500');
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
            return $scope.userPersonalization.setData(areaEdition, canvas.toDataURL());
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

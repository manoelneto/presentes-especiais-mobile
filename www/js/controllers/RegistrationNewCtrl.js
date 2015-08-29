app.controller('RegistrationNewCtrl', [
  '$scope', '$state', 'User', function($scope, $state, User) {
    if (User.fbResponse) {
      $scope.user = {
        first_name: User.fbResponse.first_name,
        last_name: User.fbResponse.middle_name + " " + User.fbResponse.last_name,
        email: User.fbResponse.email,
        image_url: User.fbResponse.picture.data.url,
        identities_attributes: [
          {
            provider: 'facebook',
            uid: User.fbResponse.id
          }
        ]
      };
    } else {
      $scope.user = {};
    }
    $scope.checkEmailAPI = function(email) {
      return User.hasEmail(email).then(function(response) {
        return $scope.has_email = response.data;
      });
    };
    return $scope.signUp = function() {
      $scope.has_email = false;
      return User.create($scope.user).then(function(response) {
        User.current_user = response.data;
        return alert("Usuário cadastrado com sucesso");
      })["catch"](function(response) {
        if (response.data.email) {
          return $scope.has_email = true;
        } else {
          return alert("Houve um erro ao conectar com o servidor");
        }
      });
    };
  }
]);

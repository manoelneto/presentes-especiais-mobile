app.controller('SignInCtrl', function($scope, $state) {
  return $scope.signIn = function(user) {
    if (user !== null) {
      console.log('Sign-In', user);
      return $state.go('list-view');
    } else {
      return alert('Preencha os campos');
    }
  };
});

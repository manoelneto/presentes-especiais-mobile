window.app = angular.module('app', ['ionic', 'ui.router', 'ngOpenFB', 'jrCrop']);

app.run(function($ionicPlatform, $openFB) {
  $openFB.init({
    appId: '1020478604640927'
  });
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
});

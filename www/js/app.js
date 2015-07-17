
var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider.state('index.html', {
            url: '/',
    views: { "index" : { templateUrl: "tpl.index.html" } },
    parent: "app"
        })
});    

(function() {
    angular.module('starter', ['ionic', 'ui.router'])
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }

                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })
        


        .controller('Login', function($scope, $state) {
              $scope.Logar = function(){
                console.log("Botao pressionado!");
                console.log($state.go("index"));
            };
        });
})();
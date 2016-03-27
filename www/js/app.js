// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordovaOauth', 'ngResource', 'ngMessages', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])
    .constant("APP_CONFIG", {
        "API": "http://services.strangefriend.com/v1", //without slash
        //"API": "http://localhost:3000/v1", //without slash
        "FB_APP_ID": "458791337651214"
    })

    .run(['$ionicPlatform', '$rootScope', '$state', '$http', 'APP_CONFIG', function ($ionicPlatform, $rootScope, $state, $http, APP_CONFIG) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        if (window.localStorage.getItem("token")) {
            $rootScope.currentToken = window.localStorage.getItem("token");
            var user = {};
            user.id = window.localStorage.getItem("userId");
            user.email = window.localStorage.getItem("userEmail");
            user.email = window.localStorage.getItem("userEmail");
            user.name = window.localStorage.getItem("userName");
            user.role = window.localStorage.getItem("userRole");
            $rootScope.currentUser = user;
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
            var requireLogin = toState.data? toState.data.requireLogin: null;
            if (requireLogin && typeof $rootScope.currentToken === 'undefined') {
                event.preventDefault();
                console.log("Restricted route, Please login/register");//,failure);
                return $state.go('page5');
            }
        });

        $http.defaults.headers.common.accesstoken = function () {
            //console.log("setting header:accesstoken ", $rootScope.currentToken);
            return $rootScope.currentToken;
        }
    }]);

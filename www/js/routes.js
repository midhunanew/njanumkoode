angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.swipeBackEnabled(false);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider


            .state('side-menu21.page1', {
                url: '/page1',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page1.html',
                        controller: 'page1Ctrl'
                    }
                }
            })

            .state('side-menu21.page2', {
                url: '/page2',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page2.html',
                        controller: 'page2Ctrl'
                    }
                }
            })

            .state('side-menu21.page9', {
                url: '/page9',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page9.html',
                        controller: 'page9Ctrl'
                    }
                }
            })

            .state('side-menu21.page10', {
                url: '/page10',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page10.html',
                        controller: 'page10Ctrl'
                    }
                }
            })

            .state('side-menu21.page11', {
                url: '/page11',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page11.html',
                        controller: 'page11Ctrl'
                    }
                }
            })

            .state('side-menu21', {
                url: '/side-menu21',
                templateUrl: 'templates/side-menu21.html',
                abstract: true,
                controller: 'MenuCtrl',
                data: {
                    requireLogin: true // this property will apply to all children of 'side-menu21'
                }
            })

            .state('side-menu21.page4', {
                cache: false,
                url: '/page4',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page4.html',
                        controller: 'page4Ctrl'
                    }
                }
            })

            .state('page5', {
                url: '/page5',
                templateUrl: 'templates/page5.html',
                controller: 'page5Ctrl'
            })

            .state('side-menu21.page6', {
                url: '/page6',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/page6.html',
                        controller: 'page6Ctrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/side-menu21/page1');

        $httpProvider.interceptors.push(function ($timeout, $q, $injector) {
            var $state;
            // use $location.url("") Or with $state
            // this trick must be done so that we don't receive
            // `Uncaught Error: [$injector:cdep] Circular dependency found`
            $timeout(function () {
                $state = $injector.get('$state');
            });

            return {
                responseError: function (rejection) {
                    console.log('Failed with ', rejection.status, ' status');
                    if (rejection.status == 401) {
                        $state.go('login');
                    }
                    return $q.reject(rejection);
                }
            };
        });


    });
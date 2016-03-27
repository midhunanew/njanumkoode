angular.module('app.services', [])

    .factory('BlankFactory', [function () {

    }])

    .service('BlankService', [function () {

    }])

    .factory('displayFactory', function ($ionicPopup, $ionicLoading) {
        return {
            showLoading: function (template) {
                if (template && template.indexOf(".html") > -1) {
                    return  $ionicLoading.show({
                        templateUrl: 'templates/' + template
                    });
                } else {
                    template = 'ദയവായി കാത്തിരിക്കുക';
                }
                $ionicLoading.show({
                    template: '<h1>' + template + '</h1>'
                });
            },
            hideLoading: function () {
                $ionicLoading.hide();
            },

            showAlert: function (title, template) {
                return $ionicPopup.show({
                    title: title,
                    template: template,
                    buttons: [
                        {
                            text: 'ശരി',
                            type: 'button-calm'
                        }
                    ]
                });
            }
        }
    })

    .factory('Help', function ($resource, APP_CONFIG) {
        return $resource(APP_CONFIG.API + '/help/:id', {id: '@data._id'},
            {
                request: {
                    method: "POST"
                }
            }
        );
    })

    .factory('Company', function () {
        var data;
        return {
            setData: function(x){
                data = x;
            },
            getData : function(){
                return data;
            }
        };
    })

    .factory('DemoComplaint', function ($resource, APP_CONFIG) {
        return $resource('complaint.json', {id: '@data._id'},
            {
                view: {
                    method: "GET"
                },
                submit: {
                    method: "POST"
                },
                edit: {
                    method: 'PUT'
                },
                withdraw: {
                    method: "DELETE"
                }
            }
        );
    })

    .factory('Complaint', function ($resource, APP_CONFIG) {
        return $resource(APP_CONFIG.API + '/complaints/:id', {id: '@data._id'},
            {
                submit: {
                    method: "POST"
                },
                edit: {
                    method: 'PUT'
                },
                withdraw: {
                    method: "DELETE"
                }
            }
        );
    })

    .factory('Solution', function ($resource, APP_CONFIG) {
        return $resource(APP_CONFIG.API + '/solution/:id', {id: '@data._id'},
            {
                submit: {
                    method: "POST"
                }
            }
        );
    });

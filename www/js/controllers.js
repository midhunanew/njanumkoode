angular.module('app.controllers', [])

    .controller('page1Ctrl', ['$scope', '$state', '$ionicHistory', 'Company', function ($scope, $state, $ionicHistory, Company) {
        $scope.startNew = function () {
            Company.setData(null);
            /*$ionicHistory.nextViewOptions({
             disableBack: true
             });*/
            $state.go('side-menu21.page4');
        }
    }])

    .controller('page2Ctrl', ['$scope', '$state', '$ionicHistory', 'Complaint', 'displayFactory', function ($scope, $state, $ionicHistory, Complaint, displayFactory) {
        $scope.goToHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('side-menu21.page1');
        };

        $scope.history = {
            exists: false,
            data: {}
        };

        var complaintsIdsArray , complaintsIds = window.localStorage.getItem("complaints");
        if (complaintsIds) {
            complaintsIdsArray = JSON.parse(complaintsIds);
        }
        else {
            complaintsIdsArray = [];
        }
        $scope.complaints = complaintsIdsArray;

        $scope.complaint = {
            opted: null,
            entered: null
        };

        $scope.setEntered = function () {
            $scope.complaint.entered = $scope.complaint.opted;
        };


        $scope.getComplaint = function (isValid) {
            console.log("$scope.complaint");
            console.log($scope.complaint);
            if (isValid) {
                displayFactory.showLoading();
                var result = Complaint.get({id: $scope.complaint.entered, history: true}, function () {
                    displayFactory.hideLoading();
                    console.log(result);
                    if (result.status) {
                        if (result.data.history) {
                            $scope.history = {
                                exists: true,
                                data: result.data.history
                            };
                            $scope.allData = result.data;
                        }
                    }
                    else {
                        displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                    }

                }, function (result) {
                    displayFactory.hideLoading();
                    console.log("result2");
                    console.log(result);
                    displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
                });
            }
        }
    }])

    .controller('page9Ctrl', ['$scope', '$state', '$ionicHistory', 'Complaint', 'Company', 'displayFactory', function ($scope, $state, $ionicHistory, Complaint, Company, displayFactory) {
        var complaintsIdsArray , complaintsIds = window.localStorage.getItem("complaints");
        if (complaintsIds) {
            complaintsIdsArray = JSON.parse(complaintsIds);
        }
        else {
            complaintsIdsArray = [];
        }
        $scope.complaints = complaintsIdsArray;

        $scope.complaint = {
            opted: null,
            entered: null
        };

        $scope.setEntered = function () {
            $scope.complaint.entered = $scope.complaint.opted;
        };

        $scope.goToHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('side-menu21.page1');
        };

        $scope.getComplaint = function (isValid) {
            console.log("$scope.complaint");
            console.log($scope.complaint);
            if (isValid) {
                displayFactory.showLoading();
                var result = Complaint.get({id: $scope.complaint.entered}, function () {
                    displayFactory.hideLoading();
                    console.log(result);
                    var temp;
                    if (result.status) {
                        if (result.data.district) {
                            temp = result.data.district;
                            result.data.district = {};
                            result.data.district.value = temp;
                        }
                        if (result.data.assembly) {
                            temp = result.data.assembly;
                            result.data.assembly = {};
                            result.data.assembly.value = temp;
                        }
                        Company.setData(result);
                        $state.go('side-menu21.page4');
                    }
                    else {
                        displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                    }

                }, function (result) {
                    displayFactory.hideLoading();
                    console.log("result2");
                    console.log(result);
                    displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
                });
            }
        }

    }])

    .controller('page10Ctrl',
    [
        '$scope', '$state', '$timeout', '$ionicHistory', '$ionicPopup', 'Complaint', 'Company', 'displayFactory',
        function ($scope, $state, $timeout, $ionicHistory, $ionicPopup, Complaint, Company, displayFactory) {
            var complaintsIdsArray , complaintsIds = window.localStorage.getItem("complaints"), index;
            if (complaintsIds) {
                complaintsIdsArray = JSON.parse(complaintsIds);
            }
            else {
                complaintsIdsArray = [];
            }
            $scope.complaints = complaintsIdsArray;

            $scope.complaint = {
                opted: null,
                entered: null
            };

            $scope.setEntered = function () {
                $scope.complaint.entered = $scope.complaint.opted;
            };

            $scope.goToHome = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('side-menu21.page1');
            };

            function removeComplaintFromLS(item) {
                complaintsIds = window.localStorage.getItem("complaints");
                if (complaintsIds) {
                    complaintsIdsArray = JSON.parse(complaintsIds);
                    index = complaintsIdsArray.indexOf(item);
                    if (index > -1) {
                        complaintsIdsArray.splice(index, 1);
                        window.localStorage.setItem("complaints", JSON.stringify(complaintsIdsArray));
                        $scope.complaints = complaintsIdsArray;
                    }
                }
            }

            $scope.deleteComplaint = function () {

                displayFactory.showLoading();
                var result = Complaint.remove({id: $scope.complaint.entered}, function () {
                    displayFactory.hideLoading();
                    console.log(result);
                    removeComplaintFromLS($scope.complaint.entered);
                    $scope.complaint.entered = null;
                    if (result.status) {
                        var alertPopup = displayFactory.showAlert("നന്ദി", result.message);
                        alertPopup.then(function (res) {
                            console.log('You are alerted');
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('side-menu21.page1');
                        });
                    }
                    else {
                        displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                    }

                }, function (result) {
                    displayFactory.hideLoading();
                    console.log("result2");
                    console.log(result);
                    displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
                });
            };

            $scope.promptDelete = function (isValid) {
                console.log("$scope.complaint");
                console.log($scope.complaint);
                if (isValid) {
                    // An elaborate, custom popup
                    var myPopup = $ionicPopup.show({
                        title: $scope.complaint.entered + ' നമ്പറിലുള്ള പരാതി പിൻവലിക്കാനുള്ള നടപടി തുടരുക?',
                        subTitle: 'പിൻവലിച്ചാൽ ഈ പരാതി വീണ്ടും കാണുവാനോ തിരുത്തുവാനോ സാധിക്കില്ല!',
                        buttons: [
                            { text: "അവസാനിപ്പിക്കുക.",
                                type: 'button-calm' },
                            {
                                text: "തുടരുക.",
                                type: 'button-dark',
                                onTap: function (e) {
                                    return $scope.deleteComplaint();
                                }
                            }
                        ]
                    });

                    myPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });

                    $timeout(function () {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 5000);
                }
            }

        }])

    .controller('page11Ctrl', [
        '$scope', '$state', '$ionicHistory', 'Complaint', 'Solution', 'displayFactory',
        function ($scope, $state, $ionicHistory, Complaint, Solution, displayFactory) {
            $scope.goToHome = function () {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('side-menu21.page1');
            };

            $scope.complaint = {
                entered: '',
                exists: false,
                data: {}
            };

            $scope.solution = {
                data: {}
            };

            $scope.getComplaint = function (isValid) {
                console.log("$scope.complaint");
                console.log($scope.complaint);
                if (isValid) {
                    displayFactory.showLoading();
                    var result = Complaint.get({id: $scope.complaint.entered, history: true}, function () {
                        displayFactory.hideLoading();
                        console.log(result);
                        if (result.status) {
                            $scope.complaint = {
                                exists: true,
                                data: result.data
                            };
                        }
                        else {
                            displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                        }

                    }, function (result) {
                        displayFactory.hideLoading();
                        console.log("result2");
                        console.log(result);
                        displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
                    });
                }
            }

            $scope.postSolution = function (isValid, form) {
                console.log("$scope.complaint");
                console.log($scope.complaint);

                if (isValid) {
                    displayFactory.showLoading();

                    console.log($scope.complaint.data._id);
                    var newSolution = new Solution();
                    newSolution.text = $scope.solution.data.text;
                    newSolution.complaintId = $scope.complaint.data._id;

                    var done = newSolution.$save();

                    done.then(function (result) {
                        displayFactory.hideLoading();
                        console.log(result);
                        if (result.status) {

                            var alertPopup = displayFactory.showAlert("നന്ദി", result.message);
                            alertPopup.then(function (res) {
                                console.log('You are alerted');
                                $scope.complaint = {
                                    entered: '',
                                    exists: false,
                                    data: {}
                                };

                                $scope.solution = {
                                    data: {}
                                };
                                form.$setUntouched();
                                form.$setPristine();
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                $state.go('side-menu21.page1');
                            });
                        }
                        else {
                            displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                        }

                    }, function (result) {
                        displayFactory.hideLoading();
                        console.log("result2");
                        console.log(result);
                        displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
                    });
                }
            }
        }])

    .controller('page4Ctrl', ['$scope', '$state', '$ionicHistory', 'displayFactory', 'Help', 'Complaint', 'Company', function ($scope, $state, $ionicHistory, displayFactory, Help, Complaint, Company) {


        $scope.goToHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('side-menu21.page1');
        };

        /*

         ************************** Section Help **************************
         * ************************** starts here ************************** *

         */

        $scope.modification = false;

        console.log(Company);
        var x = Company.getData();

        if (x) {
            var test = x.$promise.then(function (complaint) {
                console.log("arguments");
                console.log(arguments);
                var district = (complaint.data.district) ? complaint.data.district.value : '';
                if (district) {
                    $scope.assemblyList = $scope.assembyAllList[district];
                }
                $scope.complaint = complaint;
                $scope.modification = true;
                console.log(test);
            });
        }

        $scope.help = new Help();
        $scope.help.data = {
            phone: null,
            dup_phone: null
        };

        $scope.requestHelp = function (isValid, form) {
            var ErrorFound = false, Errors = [];
            if (isValid) {
                if ($scope.help.data.phone != $scope.help.data.dup_phone) {
                    ErrorFound = true;
                    Errors.push("ഒരേ ഫോൺ നമ്പർ തന്നെയാണ് രണ്ട് പ്രാവശ്യവും എഴുതിയതെന്ന് ഉറപ്പ് വരുത്തുക");
                }
            }
            else {
                displayFactory.showAlert("ശ്രദ്ധിക്കുക", "ഒരേ ഫോൺ നമ്പർ  രണ്ടിടത്തും എഴുതിയ ശേഷം സമർപ്പിക്കുക. ");
                return false;
            }
            if (ErrorFound) {
                var ErrorStr = Errors.join("<br>");
                displayFactory.showAlert("ശ്രദ്ധിക്കുക", ErrorStr);
                return false;
            }
            displayFactory.showLoading();
            $scope.help.$request(function (result) {
                displayFactory.hideLoading();
                console.log(result);
                if (result.status) {
                    var alertPopup = displayFactory.showAlert("നന്ദി", result.message);
                    alertPopup.then(function (res) {
                        console.log('You are alerted');
                        form.$setUntouched();
                        form.$setPristine();
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go('side-menu21.page1');
                    });
                }
                else {
                    displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                }

            }, function (result) {
                displayFactory.hideLoading();
                console.log("result2");
                console.log(result);
                displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
            });
        };


        /*

         ************************** Section Complaint **************************
         * ************************** starts here ************************** *

         */

        $scope.districtList = [
            {value: "1", label: "1.കാസർഗോഡ്‌ "},
            {value: "2", label: "2.കണ്ണൂർ"},
            {value: "3", label: "3.വയനാട്"},
            {value: "4", label: "4.കോഴിക്കോട്"},
            {value: "5", label: "5.മലപ്പുറം"},
            {value: "6", label: "6.പാലക്കാട്‌"},
            {value: "7", label: "7.തൃശൂർ"},
            {value: "8", label: "8.എറണാകുളം"},
            {value: "9", label: "9.ഇടുക്കി"},
            {value: "10", label: "10.കോട്ടയം"},
            {value: "11", label: "11.ആലപ്പുഴ"},
            {value: "12", label: "12.പത്തനംതിട്ട"},
            {value: "13", label: "13.കൊല്ലം"},
            {value: "14", label: "14.തിരുവനന്തപുരം"}
        ];

        $scope.assemblyList = [];

        $scope.assembyAllList = {
            1: [
                {value: "1", label: "1.മഞ്ചേശ്വരം്വർ"},
                {value: "2", label: "2.കാസര്‍കോഡ്‌‌"},
                {value: "3", label: "3.ഉദുമമ "},
                {value: "4", label: "4.കാഞ്ഞങ്ങാട്‌"},
                {value: "5", label: "5.തൃക്കരിപ്പൂര്‍പുർ"}
            ],
            2: [
                {value: "6", label: "6.പയ്യന്നൂര്‍്നൂർ"},
                {value: "7", label: "7.കല്ല്യാശ്ശേരിശേരി "},
                {value: "8", label: "8.തളിപ്പറമ്പ്‌പറമ്പ്"},
                {value: "9", label: "9.ഇരിക്കൂര്‍കൂർ "},
                {value: "10", label: "10.അഴീക്കോട്‌"},
                {value: "11", label: "11.കണ്ണൂര്‍"},
                {value: "12", label: "12.ധര്‍മ്മടം"},
                {value: "13", label: "13.തലശ്ശേരി"},
                {value: "14", label: "14.കൂത്തുപറമ്പ്‌"},
                {value: "15", label: "15.മട്ടന്നൂര്‍"},
                {value: "16", label: "16.പേരാവൂര്‍"}
            ],
            3: [
                {value: "17", label: "17.മാനന്തവാടി"},
                {value: "18", label: "18.സുല്‍ത്താന്‍ബത്തേരി"},
                {value: "19", label: "19.കല്പറ്റ"}
            ],
            4: [
                {value: "20", label: "20.വടകര"},
                {value: "21", label: "21.കുറ്റിയാടി"},
                {value: "22", label: "22.നാദാപുരം"},
                {value: "23", label: "23.കൊയിലാണ്ടി"},
                {value: "24", label: "24.പേരാമ്പ്ര"},
                {value: "25", label: "25.ബാലുശ്ശേരി"},
                {value: "26", label: "26.എലത്തൂര്‍"},
                {value: "27", label: "27.കോഴിക്കോട് (നോര്‍ത്ത്)ത്ത്"},
                {value: "28", label: "28.കോഴിക്കോട് (സൗത്ത്)്ത്"},
                {value: "29", label: "29.ബേപ്പൂര്‍"},
                {value: "30", label: "30.കുന്ദമംഗലം"},
                {value: "31", label: "31.കൊടുവള്ളി"},
                {value: "32", label: "32.തിരുവമ്പാടി"}
            ],
            5: [
                {value: "33", label: "33.കൊണ്ടോട്ടി"},
                {value: "34", label: "34.ഏറനാട്‌"},
                {value: "35", label: "35.നിലമ്പൂര്‍"},
                {value: "36", label: "36.വണ്ടൂര്‍"},
                {value: "37", label: "37.മഞ്ചേരി"},
                {value: "38", label: "38.പെരിന്തല്‍മണ്ണ"},
                {value: "39", label: "39.മങ്കട"},
                {value: "40", label: "40.മലപ്പുറം"},
                {value: "41", label: "41.വേങ്ങര"},
                {value: "42", label: "42.വള്ളിക്കുന്ന്‌"},
                {value: "43", label: "43.തിരുരങ്ങാടി"},
                {value: "44", label: "44.താനൂര്‍"},
                {value: "45", label: "45.തിരൂര്‍"},
                {value: "46", label: "46.കോട്ടക്കല്‍"},
                {value: "47", label: "47.തവനൂര്‍"},
                {value: "48", label: "48.പൊന്നാനി"}
            ],
            6: [
                {value: "49", label: "49.തൃത്താല"},
                {value: "50", label: "50.പട്ടാമ്പി"},
                {value: "51", label: "51.ഷൊറണൂര്‍"},
                {value: "52", label: "52.ഒറ്റപ്പാലം"},
                {value: "53", label: "53.കോങ്ങാട്‌"},
                {value: "54", label: "54.മണ്ണാര്‍ക്കാട്‌"},
                {value: "55", label: "55.മലമ്പുഴ"},
                {value: "56", label: "56.പാലക്കാട്‌‌"},
                {value: "57", label: "57.തരൂര്‍"},
                {value: "58", label: "58.ചിറ്റൂര്‍"},
                {value: "59", label: "59.നെന്മാറ"},
                {value: "60", label: "60.ആലത്തൂര്‍"}
            ],
            7: [
                {value: "61", label: "61.ചേലക്കര"},
                {value: "62", label: "62.കുന്ദംകുളം"},
                {value: "63", label: "63.ഗുരുവായൂര്‍"},
                {value: "64", label: "64.മണലൂര്‍"},
                {value: "65", label: "65.വടക്കാഞ്ചേരി"},
                {value: "66", label: "66.ഒല്ലൂര്‍"},
                {value: "67", label: "67.തൃശ്ശൂര്‍ "},
                {value: "68", label: "68.നാട്ടിക"},
                {value: "69", label: "69.കയ്പമംഗലം"},
                {value: "70", label: "70.ഇരിങ്ങാലക്കുട"},
                {value: "71", label: "71.പുതുക്കാട്‌‌"},
                {value: "72", label: "72.ചാലക്കുടി"},
                {value: "73", label: "73.കൊടുങ്ങല്ലൂര്‍"}
            ],
            8: [
                {value: "74", label: "74.പെരുമ്പാവൂര്‍"},
                {value: "75", label: "75.അങ്കമാലി"},
                {value: "76", label: "76.ആലുവ"},
                {value: "77", label: "77.കളമശ്ശേരി"},
                {value: "78", label: "78.പറവൂര്‍"},
                {value: "79", label: "79.വൈപ്പിന്‍‍"},
                {value: "80", label: "80.കൊച്ചി"},
                {value: "81", label: "81.തൃപ്പൂണിത്തുറ"},
                {value: "82", label: "82.എറണാകുളം"},
                {value: "83", label: "83.തൃക്കാക്കര"},
                {value: "84", label: "84.കുന്നുത്തുനാട്‌"},
                {value: "85", label: "85.പിറവം"},
                {value: "86", label: "86.മൂവാറ്റുപുഴ"},
                {value: "87", label: "87.കോതമംഗലം"}
            ],
            9: [
                {value: "88", label: "88.ദേവികുളം"},
                {value: "89", label: "89.ഉടുമ്പന്‍ചോല"},
                {value: "90", label: "90.തൊടുപുഴ"},
                {value: "91", label: "91.ഇടുക്കി"},
                {value: "92", label: "92.പീരുമേട്‌"}
            ],
            10: [
                {value: "93", label: "93.പാല"},
                {value: "94", label: "94.കടുത്തുരുത്തി"},
                {value: "95", label: "95.വൈക്കം"},
                {value: "96", label: "96.ഏറ്റുമാനൂര്‍"},
                {value: "97", label: "97.കോട്ടയം"},
                {value: "98", label: "98.പുതുപ്പള്ളി"},
                {value: "99", label: "99.ചങ്ങനാശ്ശേരി"},
                {value: "100", label: "100.കാഞ്ഞിരപ്പള്ളി"},
                {value: "101", label: "101.പൂഞ്ഞാര്‍"}
            ],
            11: [
                {value: "102", label: "102.അരൂര്‍ "},
                {value: "103", label: "103.ചേര്‍ത്തല"},
                {value: "104", label: "104.ആലപ്പുഴ"},
                {value: "105", label: "105.അമ്പലപ്പുഴ"},
                {value: "106", label: "106.കുട്ടനാട്‌"},
                {value: "107", label: "107.ഹരിപ്പാട്‌"},
                {value: "108", label: "108.കായംകുളം"},
                {value: "109", label: "109.മാവേലിക്കര"},
                {value: "110", label: "110.ചെങ്ങന്നൂര്‍"}
            ],
            12: [
                {value: "111", label: "111.തിരുവല്ല"},
                {value: "112", label: "112.റാന്നി"},
                {value: "113", label: "113.ആറന്മുള"},
                {value: "114", label: "114.കോന്നി"},
                {value: "115", label: "115.അടൂര്‍ "}
            ],
            13: [
                {value: "116", label: "116.കരുനാഗപ്പള്ളി"},
                {value: "117", label: "117.ചവറ"},
                {value: "118", label: "118.കുന്നത്തൂര്‍ "},
                {value: "119", label: "119.കൊട്ടാരക്കര"},
                {value: "120", label: "120.പത്തനാപുരം"},
                {value: "121", label: "121.പുനലൂര്‍"},
                {value: "122", label: "122.ചടയമംഗലം"},
                {value: "123", label: "123.കുണ്ടറ"},
                {value: "124", label: "124.കൊല്ലം"},
                {value: "125", label: "125.ഇരവിപുരം"},
                {value: "126", label: "126.ചാത്തന്നൂര്‍"}
            ],
            14: [
                {value: "127", label: "127.വര്‍ക്കല"},
                {value: "128", label: "128.ആറ്റിങ്ങല്‍ "},
                {value: "129", label: "129.ചിറയിന്‍കീഴ്‌"},
                {value: "130", label: "130.നെടുമങ്ങാട്‌"},
                {value: "131", label: "131.വാമനപുരം"},
                {value: "132", label: "132.കഴക്കൂട്ടം"},
                {value: "133", label: "133.വട്ടിയൂര്കാവ്‌'"},
                {value: "134", label: "134.തിരുവനന്തപുരം"},
                {value: "135", label: "135.നേമം"},
                {value: "136", label: "136.അരുവിക്കര"},
                {value: "137", label: "137.പാറശ്ശാല"},
                {value: "138", label: "138.കാട്ടാക്കട"},
                {value: "139", label: "139.കോവളം"},
                {value: "140", label: "140.നെയ്യാറ്റിന്‍കര"}
            ]
        };

        if (!$scope.complaint) {
            $scope.complaint = new Complaint();
            $scope.complaint.data = {
                text: null,
                identification: null
            };
        }

        $scope.setLAList = function () {
            var district = $scope.complaint.data.district.value;
            console.log(district);
            $scope.assemblyList = $scope.assembyAllList[district];
        }

        $scope.newComplaint = function (isValid, form) {
            var complaintsIdsArray , complaintsIds = window.localStorage.getItem("complaints");
            if (!isValid) {
                displayFactory.showAlert("ശ്രദ്ധിക്കുക", "വിട്ട് പോയ ഭാഗങ്ങൾ പൂരിപ്പിച്ചശേഷം വീണ്ടും സമർപ്പിക്കുക.");
                return false;
            }

            displayFactory.showLoading();
            $scope.complaint.$submit(function (result) {
                displayFactory.hideLoading();
                console.log(result);
                if (result.status) {

                    if (complaintsIds) {
                        complaintsIdsArray = JSON.parse(complaintsIds);
                    }
                    else {
                        complaintsIdsArray = [];
                    }
                    if (complaintsIdsArray.indexOf($scope.complaint.data._id) === -1) {
                        complaintsIdsArray.push($scope.complaint.data._id);
                    }
                    window.localStorage.setItem("complaints", JSON.stringify(complaintsIdsArray));
                    window.localStorage.setItem("comp" + $scope.complaint.data._id, JSON.stringify($scope.complaint.data));
                    var alertPopup = displayFactory.showAlert(
                        "നന്ദി",
                        result.message
                    );
                    alertPopup.then(function (res) {
                        console.log('You are alerted');
                        form.$setUntouched();
                        form.$setPristine();
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                        $state.go('side-menu21.page1');
                    });
                }
                else {
                    displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                }

            }, function (result) {
                displayFactory.hideLoading();
                console.log("result2");
                console.log(result);
                displayFactory.showAlert("ഖേദിക്കുന്നു", "ശ്രമം പരാജയപ്പെട്ടു, ദയവായി വീണ്ടും ശ്രമിക്കുക.");
            });
        };
    }])

    .controller('page5Ctrl', [
        '$scope', '$rootScope', '$resource', '$state', '$interval', '$timeout', '$cordovaOauth', '$ionicHistory', 'APP_CONFIG', 'displayFactory',
        function ($scope, $rootScope, $resource, $state, $interval, $timeout, $cordovaOauth, $ionicHistory, APP_CONFIG, displayFactory) {

            if($rootScope.currentToken){
                $state.go('side-menu21.page1');
            }

            var count;

            $scope.resetOTP = function () {
                count = 30;

                $scope.otp = {
                    data: {
                        phone: "",
                        email: ""
                    },
                    requested: false,
                    retryDisabled: true,
                    type: "phone" // | "email"
                };
                $scope.polling = false;
                $scope.timerText = "പുതിയ നമ്പർ ലഭിക്കുന്നതിനായ്  വീണ്ടും തുടങ്ങാൻ അല്പ്പം ക്ഷമിക്കുക";
                $rootScope.verificationPending = false;
            };

            //initialize
            $scope.resetOTP();

            function createSession(data) {
                console.log("creating session for token:" + data.token);
                $rootScope.currentUser = data.user;
                $rootScope.currentToken = data.token;
                window.localStorage.setItem("token", data.token);
                if(data.user){
                    window.localStorage.setItem("userId", data.user.id);
                    window.localStorage.setItem("userEmail", data.user.email);
                    window.localStorage.setItem("userName", data.user.name);
                    window.localStorage.setItem("userPhone", data.user.phone);
                    window.localStorage.setItem("userRole", data.user.role);
                }
            }

            function showTimer() {
                count--;
                $scope.timerText = "Please wait, " + count;
            }

            $scope.checkVerificationStatus = function (showMessage) {
                if (showMessage) {
                    displayFactory.showLoading();
                    $rootScope.verificationPending = window.localStorage.getItem("verify");
                }
                $resource(APP_CONFIG.API + '/users/token/' + $rootScope.verificationPending).get(function (result) {
                        console.log(result);
                        if (showMessage) {
                            displayFactory.hideLoading();
                            displayFactory.showAlert("നന്ദി", result.message);
                        }
                        if (result.status) {
                            console.info("receiving token for the first time");
                            $rootScope.verificationPending = false;
                            window.localStorage.removeItem("verify");
                            createSession(result.data);
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('side-menu21.page1');
                        }
                    },
                    function (error) {
                        if (error.data && !error.data.status) {
                            $rootScope.verificationPending = false;
                        }
                        if (showMessage && error.data) {
                            displayFactory.hideLoading();
                            displayFactory.showAlert("ഖേദിക്കുന്നു", error.data.message);
                        }
                    }
                );
            };

            $scope.verifyOTPStatus = function () {
                console.info("start polling");
                // Don't start a new fight if we are already fighting
                console.log('returned?', stop);
                if (angular.isDefined(stop)) return;
                $scope.polling = true;
                stop = $interval(function () {
                    if ($rootScope.verificationPending) {
                        $scope.checkVerificationStatus();
                    } else {
                        $scope.stopFight();
                    }
                }, 6000, 3).then(function () {
                    $scope.polling = false;
                    if (angular.isDefined(stop)) {
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                });
            };

            $scope.stopFight = function () {
                console.info("stop polling");
                $scope.polling = false;
                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;
                }
            };

            function otpSuccess(result) {
                if (result.status) {
                    $scope.otp.requested = true;
                    $scope.otp.type = result.data.type;
                    window.localStorage.setItem("verify", result.data.verify);
                    $rootScope.verificationPending = result.data.verify;
                    $interval(showTimer, 1000, 30);
                    $timeout(function () {
                        $scope.otp.retryDisabled = false;
                        $scope.verifyOTPStatus();
                    }, 10000);
                }
                else {
                    displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                }
                displayFactory.hideLoading();
            }

            var verify = window.localStorage.getItem("verify"), stop;

            if (verify) {
                $rootScope.verificationPending = verify;
                $scope.verifyOTPStatus();
            }

            $scope.requestPhoneOTP = function (isValid) {
                if (!isValid) {
                    return;
                }
                console.log("$scope.otp");
                console.log($scope.otp);
                displayFactory.showLoading();
                $resource(APP_CONFIG.API + '/users/phone').save($scope.otp, otpSuccess, function (result) {
                    displayFactory.hideLoading();
                    displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                });
            };

            $scope.requestEmailOTP = function (isValid) {
                if (!isValid) {
                    return;
                }
                console.log("$scope.otp");
                console.log($scope.otp);
                displayFactory.showLoading();
                $resource(APP_CONFIG.API + '/users/email').save($scope.otp, otpSuccess, function (result) {
                    displayFactory.hideLoading();
                    displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                });
            };

            $scope.facebookLogin = function () {
                displayFactory.showLoading();
                $cordovaOauth.facebook(APP_CONFIG.FB_APP_ID, ["public_profile", "email", "user_friends" ]).then(function (result) {
                    $resource(APP_CONFIG.API + '/users/fbcallback').save(
                        result,
                        function (result) {
                            displayFactory.hideLoading();
                            if (result.status) {
                                createSession(result.data);
                                $ionicHistory.nextViewOptions({
                                    disableBack: true
                                });
                                console.log('going to Home');
                                $state.go('side-menu21.page1');
                            }
                            else {
                                displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                            }
                        },
                        function (result) {
                            displayFactory.hideLoading();
                            displayFactory.showAlert("ഖേദിക്കുന്നു", result.message);
                        }
                    );
                }, function (error) {
                    displayFactory.hideLoading();
                    displayFactory.showAlert("ഖേദിക്കുന്നു", error.message);
                });
            };

            $scope.$on('$destroy', function () {
                // Make sure that the interval is destroyed too
                $scope.stopFight();
            });
        }
    ])

    .
    controller('page6Ctrl', function ($scope) {

    })

    .controller('MenuCtrl', ['$scope', '$state', '$ionicHistory', 'Company', function ($scope, $state, $ionicHistory, Company) {
        $scope.startNew = function () {
            Company.setData(null);
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('side-menu21.page4');
        }
    }])

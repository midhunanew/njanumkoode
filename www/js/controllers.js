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
            {value: "1", label: "1.KASARAGOD"},
            {value: "2", label: "2.KANNUR"},
            {value: "3", label: "3.WAYANAD"},
            {value: "4", label: "4.KOZHIKODE"},
            {value: "5", label: "5.MALAPPURAM"},
            {value: "6", label: "6.PALAKKAD"},
            {value: "7", label: "7.THRISSUR"},
            {value: "8", label: "8.ERNAKULAM"},
            {value: "9", label: "9.IDUKKI"},
            {value: "10", label: "10.KOTTAYAM"},
            {value: "11", label: "11.ALAPPUZHA"},
            {value: "12", label: "12.PATHANAMTHITTA"},
            {value: "13", label: "13.KOLLAM"},
            {value: "14", label: "14.THIRUVANANTHAPURAM"}
        ];

        $scope.assemblyList = [];

        $scope.assembyAllList = {
            1: [
                {value: "1", label: "1.MANJESHWAR"},
                {value: "2", label: "2.KASARAGOD"},
                {value: "3", label: "3.UDMA"},
                {value: "4", label: "4.KANHANGAD"},
                {value: "5", label: "5.TRIKARIPUR"}
            ],
            2: [
                {value: "6", label: "6.PAYYANNUR"},
                {value: "7", label: "7.KALLIASSERI"},
                {value: "8", label: "8.TALIPARAMBA"},
                {value: "9", label: "9.IRIKKUR"},
                {value: "10", label: "10.AZHIKODE"},
                {value: "11", label: "11.KANNUR"},
                {value: "12", label: "12.DHARMADAM"},
                {value: "13", label: "13.THALASSERY"},
                {value: "14", label: "14.KUTHUPARAMBA"},
                {value: "15", label: "15.MATTANNUR"},
                {value: "16", label: "16.PERAVOOR"}
            ],
            3: [
                {value: "17", label: "17.MANANTHAVADY"},
                {value: "18", label: "18.SULTHANBATHERY"},
                {value: "19", label: "19.KALPETTA"}
            ],
            4: [
                {value: "20", label: "20.VADAKARA"},
                {value: "21", label: "21.KUTTIADI"},
                {value: "22", label: "22.NADAPURAM"},
                {value: "23", label: "23.QUILANDY"},
                {value: "24", label: "24.PERAMBRA"},
                {value: "25", label: "25.BALUSSERI"},
                {value: "26", label: "26.ELATHUR"},
                {value: "27", label: "27.KOZHIKODE NORTH"},
                {value: "28", label: "28.KOZHIKODE SOUTH"},
                {value: "29", label: "29.BEYPORE"},
                {value: "30", label: "30.KUNNAMANGALAM"},
                {value: "31", label: "31.KODUVALLY"},
                {value: "32", label: "32.THIRUVAMBADY"}
            ],
            5: [
                {value: "33", label: "33.KONDOTTY"},
                {value: "34", label: "34.ERANAD"},
                {value: "35", label: "35.NILAMBUR"},
                {value: "36", label: "36.WANDOOR"},
                {value: "37", label: "37.MANJERI"},
                {value: "38", label: "38.PERINTHALMANNA"},
                {value: "39", label: "39.MANKADA"},
                {value: "40", label: "40.MALAPPURAM"},
                {value: "41", label: "41.VENGARA"},
                {value: "42", label: "42.VALLIKKUNNU"},
                {value: "43", label: "43.TIRURANGADI"},
                {value: "44", label: "44.TANUR"},
                {value: "45", label: "45.TIRUR"},
                {value: "46", label: "46.KOTTAKKAL"},
                {value: "47", label: "47.THAVANUR"},
                {value: "48", label: "48.PONNANI"}
            ],
            6: [
                {value: "49", label: "49.THRITHALA"},
                {value: "50", label: "50.PATTAMBI"},
                {value: "51", label: "51.SHORNUR"},
                {value: "52", label: "52.OTTAPALAM"},
                {value: "53", label: "53.KONGAD"},
                {value: "54", label: "54.MANNARKAD"},
                {value: "55", label: "55.MALAMPUZHA"},
                {value: "56", label: "56.PALAKKAD"},
                {value: "57", label: "57.TARUR"},
                {value: "58", label: "58.CHITTUR"},
                {value: "59", label: "59.NENMARA"},
                {value: "60", label: "60.ALATHUR"}
            ],
            7: [
                {value: "61", label: "61.CHELAKKARA"},
                {value: "62", label: "62.KUNNAMKULAM"},
                {value: "63", label: "63.GURUVAYOOR"},
                {value: "64", label: "64.MANALUR"},
                {value: "65", label: "65.WADAKKANCHERY"},
                {value: "66", label: "66.OLLUR"},
                {value: "67", label: "67.THRISSUR"},
                {value: "68", label: "68.NATTIKA"},
                {value: "69", label: "69.KAIPAMANGALAM"},
                {value: "70", label: "70.IRINJALAKKUDA"},
                {value: "71", label: "71.PUTHUKKAD"},
                {value: "72", label: "72.CHALAKKUDY"},
                {value: "73", label: "73.KODUNGALLUR"}
            ],
            8: [
                {value: "74", label: "74.PERUMBAVOOR"},
                {value: "75", label: "75.ANGAMALY"},
                {value: "76", label: "76.ALUVA"},
                {value: "77", label: "77.KALAMASSERY"},
                {value: "78", label: "78.PARAVUR"},
                {value: "79", label: "79.VYPEN"},
                {value: "80", label: "80.KOCHI"},
                {value: "81", label: "81.THRIPUNITHURA"},
                {value: "82", label: "82.ERANAKULAM"},
                {value: "83", label: "83.THRIKKAKARA"},
                {value: "84", label: "84.KUNNATHUNAD "},
                {value: "85", label: "85.PIRAVOM"},
                {value: "86", label: "86.MUVATTUPUZHA"},
                {value: "87", label: "87.KOTHAMANGALAM"}
            ],
            9: [
                {value: "88", label: "88.DEVIKULAM "},
                {value: "89", label: "89.UDUMBANCHOLA"},
                {value: "90", label: "90.THODUPUZHA"},
                {value: "91", label: "91.IDUKKI"},
                {value: "92", label: "92.PEERUMADE"}
            ],
            10: [
                {value: "93", label: "93.PALA"},
                {value: "94", label: "94.KADUTHURUTHY"},
                {value: "95", label: "95.VAIKOM"},
                {value: "96", label: "96.ETTUMANOOR"},
                {value: "97", label: "97.KOTTAYAM"},
                {value: "98", label: "98.PUTHUPPALLY"},
                {value: "99", label: "99.CHANGANASSERY"},
                {value: "100", label: "100.KANJIRAPPALLY"},
                {value: "101", label: "101.POONJAR"}
            ],
            11: [
                {value: "102", label: "102.AROOR"},
                {value: "103", label: "103.CHERTHALA"},
                {value: "104", label: "104.ALAPPUZHA"},
                {value: "105", label: "105.AMBALAPUZHA"},
                {value: "106", label: "106.KUTTANAD"},
                {value: "107", label: "107.HARIPAD"},
                {value: "108", label: "108.KAYAMKULAM"},
                {value: "109", label: "109.MAVELIKARA "},
                {value: "110", label: "110.CHENGANNUR"}
            ],
            12: [
                {value: "111", label: "111.THIRUVALLA"},
                {value: "112", label: "112.RANNI"},
                {value: "113", label: "113.ARANMULA"},
                {value: "114", label: "114.KONNI"},
                {value: "115", label: "115.ADOOR "}
            ],
            13: [
                {value: "116", label: "116.KARUNAGAPPALLY"},
                {value: "117", label: "117.CHAVARA"},
                {value: "118", label: "118.KUNNATHUR "},
                {value: "119", label: "119.KOTTARAKKARA"},
                {value: "120", label: "120.PATHANAPURAM"},
                {value: "121", label: "121.PUNALUR"},
                {value: "122", label: "122.CHADAYAMANGALAM"},
                {value: "123", label: "123.KUNDARA"},
                {value: "124", label: "124.KOLLAM"},
                {value: "125", label: "125.ERAVIPURAM"},
                {value: "126", label: "126.CHATHANNUR"}
            ],
            14: [
                {value: "127", label: "127.VARKALA"},
                {value: "128", label: "128.ATTINGAL "},
                {value: "129", label: "129.CHIRAYINKEEZHU"},
                {value: "130", label: "130.NEDUMANGAD"},
                {value: "131", label: "131.VAMANAPURAM"},
                {value: "132", label: "132.KAZHAKKOOTTAM"},
                {value: "133", label: "133.VATTIYOORKAVU"},
                {value: "134", label: "134.THIRUVANANTHAPURAM"},
                {value: "135", label: "135.NEMOM"},
                {value: "136", label: "136.ARUVIKKARA"},
                {value: "137", label: "137.PARASSALA"},
                {value: "138", label: "138.KATTAKKADA"},
                {value: "139", label: "139.KOVALAM"},
                {value: "140", label: "140.NEYYATTINKARA"}
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
                $scope.timerText = "puthiya number labhikkaanaayi veendum thudanguvaan alppam kshamikkuka";
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

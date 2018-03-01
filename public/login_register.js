angular.module('login_register',['ui.router'])
    .config(['$stateProvider',function($stateProvider){
        $stateProvider
            .state('index', {
                url: '/index',
                abstract: true,
                templateUrl: 'Login_Register.html',
                controller: function ($scope) {
                    $scope.flag = 'signin';
                    $scope.getFlag = function (a) {
                        debugger;
                        if (a === 0) {
                            $scope.flag = 'signup';
                            $scope.isSelected = false;
                        } else {
                            $scope.flag = 'signin';
                            $scope.isSelected = true;
                        }
                    };
                }
            })
            .state('index.login', {
                url: '',
                views: {
                    'login': {
                        //template:'我是登录页'
                        templateUrl: 'login.html',
                        controller: function ($scope, $rootScope, $state, loginService) {
                            $scope.user = {
                                name: "孙悟空",
                                pwd: "wsdrj123"
                            }
                            $scope.subLogin = function (user) {
                                debugger;
                                $rootScope.user = loginService.login($scope.user);

                            }
                        }
                    },
                    'register': {
                        templateUrl: 'register.html',
                    }
                }
            })
    }])

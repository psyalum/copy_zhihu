var routerApp = angular.module('zhihu',
    [
        'index',
        'search',
        'login_register',
        'loginMd',
        'approMd',
        'commentMd',
        'getDetailMd',
        'getContentMd',
        'popwindowMd',
        'ui.router'
    ]
);
routerApp
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }])
    //配置系统需要的数据
    .run(function ($rootScope, $state, loginService) {
        debugger;
        $rootScope.user = loginService.isLogin();
        $rootScope.outLogin = function () {
            loginService.outLogin();
            $rootScope.user = null;
        }
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //利用$rootScope.$on()对路由状态改变的监听,$stateChangeSuccess:切换成功;toState:目的路由状态,toParams:传到目的路由的参数
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
        });
        //实现返回上一状态的函数ng-click="back()"
        $rootScope.back = function () {
            $state.go($rootScope.previousState_name, $rootScope.previousState_params);
        };
    })
    .service('jsonToStr', function () {
        this.transform = function (jsonData) {
            var string = '';
            for (str in jsonData) {
                string = string + str + '=' + jsonData[str] + '&';
            }
            var _last = string.lastIndexOf('&');
            string = string.substring(0, _last);
            return string;
        };
    })
angular.module('index', ['ui.router', 'loginMd', 'approMd', 'commentMd','getDetailMd','getContentMd'])
    .config(['$stateProvider', function ($stateProvider, loginService, approvalService, commentService,getContentService,getDetailService) {
        debugger;
        $stateProvider
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'home_container.html',
                controller: function ($scope, $rootScope, $http, $state) {
                    if ($rootScope.user == null) {
                        $state.go('index.login');
                    }
                    $scope.queswindow=function(){
                       $rootScope.quesflag=1;
                    }
                }
            })
            .state('home.main', {
                url: '',
                views: {
                    // 'topbar': {
                    //     templateUrl: 'topbar.html',
                    //     controller: function ($scope, $rootScope,$state, $http,getContentService) {
                    //         $scope.queswindow=function(){
                    //            // alert('提问');
                    //             $rootScope.quesflag=1;
                    //         }
                    //         $scope.searchData = function (event) {
                    //             debugger;
                    //             var topsearchinput = document.getElementsByClassName("top-search-input")[0];
                    //             $scope.temp = topsearchinput.value;
                    //             if ($scope.temp == '') {
                    //                 //???这里要修改$scope.returnIndex();
                    //             } else {
                    //                 var arr=[];
                    //                 arr[0]=$scope.temp;
                    //                 getContentService.getContent(arr);
                    //                 //console.log(getContentService.getContent(arr));
                    //
                    //                // $state.go('search.main',{'searchKey':$scope.temp});
                    //             }
                    //         };
                    //     }
                    // },
                    "topic": {
                        templateUrl: 'topic.html',
                        controller: function ($scope, $rootScope, $http, $state, jsonToStr, approvalService, commentService,getContentService,getDetailService) {
                            getContentService.getContent([]);
                            $scope.approData = function (x) {
                                approvalService.approval(x);
                            }
                            $scope.disscuData = function (x) {
                                commentService.getcomment(x);
                            }
                            $scope.postComment = function (coll, event) {
                                commentService.addcomment(coll, event);
                            }
                            $scope.discuss_sec_data = function (c, event) {
                                commentService.seccommentinput(c, event);
                            }
                            $scope.undiscuss_sec = function (c) {
                                commentService.undiscuss_sec(c);
                            }
                            $scope.getDetail = function (x) {
                                var tempid={id:x.db_zhihu_ques_id};
                                $scope.temptitle=x.db_zhihu_ques_title
                                getDetailService.getdetail(tempid);
                                $state.go('home.detail');
                                //console.log(x);
                                //console.log(x.db_zhihu_ques_id);
                            }
                        }
                    }
                }
            })
            .state('home.search',{
                url: '/search:/:searchKey',
                views: {
                    'topic':{
                    url:'',
                    templateUrl: 'topic.html',
                    controller:function($scope, $rootScope, $http, $state, jsonToStr, commentService,approvalService,getContentService,getDetailService){
                        $scope.approData = function (x) {
                            approvalService.approval(x);
                        }
                        $scope.disscuData = function (x) {
                            commentService.getcomment(x);
                        }
                        $scope.postComment = function (coll, event) {
                            commentService.addcomment(coll, event);
                        }
                        $scope.discuss_sec_data = function (c, event) {
                            commentService.seccommentinput(c, event);
                        }
                        $scope.undiscuss_sec = function (c) {
                            commentService.undiscuss_sec(c);
                        }
                        $scope.getDetail = function (x) {
                            var tempid={id:x.db_zhihu_ques_id};
                            $scope.temptitle=x.db_zhihu_ques_title
                            getDetailService.getdetail(tempid);
                            $state.go('home.detail');
                            //console.log(x);
                            //console.log(x.db_zhihu_ques_id);
                        }

                    }
                }}
            })

            .state('home.detail',{
                url: '/detail',
                views: {
                    'topic':{
                        url:'',
                        templateUrl: 'answer.html',//这里根本就没显示，所以状态没有转到这里
                        controller:function($scope, $rootScope, $http, $state, jsonToStr, commentService,approvalService,getContentService,getDetailService){
                            $scope.approData = function (x) {
                                approvalService.approval(x);
                            }
                            $scope.disscuData = function (x) {
                                commentService.getcomment(x);
                            }
                            $scope.postComment = function (coll, event) {
                                commentService.addcomment(coll, event);
                            }
                            $scope.discuss_sec_data = function (c, event) {
                                commentService.seccommentinput(c, event);
                            }
                            $scope.undiscuss_sec = function (c) {
                                commentService.undiscuss_sec(c);
                            }
                        }
                    }}
            })
            .state('error', {
                url: '/error404',
                template: '还没做的页面'
            })

    }])

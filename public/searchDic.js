/**
 * 搜索框指令
 */
angular.module("search", ['getContentMd', 'getDetailMd'])
    .directive('xmSearch', function factory($timeout, $rootScope, $http, $state, getContentService, getDetailService) {
        var directiveDefinitionObject = {
            restrict: 'AE',
            replace: true,
            templateUrl: "searchDic.html",
            scope: {},
            priority: 0,
            compile: function compile(tElement, tAttrs, transclude) {
                return function (scope, element, attrs) {
                    // scope.searchResultList=[];
                    scope.getDetail = function (x) {
                        debugger;
                        var tempid = {id: x.quesid};
                        scope.temptitle = x.title
                        getDetailService.getdetail(tempid);
                        $state.go('home.detail');
                    };
                    scope.closeContent = function () {
                        var timeout;
                        if (timeout) {
                            $timeout.cancel(timeout);
                        }
                        timeout = $timeout(function () {
                            debugger;
                            scope.searchResultList = [];
                        },3000);
                    };
                    scope.$watch('userSearch', function () {
                        var timeout;
                        if (timeout) {
                            $timeout.cancel(timeout);
                        }
                        timeout = $timeout(function () {
                            temp=scope.userSearch;
                            if (temp != '') {
                                // alert(temp);
                                $http({
                                    url: '/getSearchContent',
                                    method: 'get',
                                    params: {
                                        "search": temp
                                    },
                                    headers: {
                                        'Accept': '*/*',
                                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                                    }
                                }).success(function (results) {
                                    console.log(results);
                                    scope.searchResultList = [];

                                    for (var i = 0; i < results.length; i++) {
                                        scope.searchResultList[i] = {};
                                        scope.searchResultList[i].quesid = results[i].db_zhihu_ques_id;
                                        scope.searchResultList[i].title = results[i].db_zhihu_ques_title;
                                    }
                                });
                            }
                        }, 300);
                    })
                    // scope.changeSearchVal=function(){
                    //     $timeout(function(){
                    //         debugger;
                    //         // var topsearchinput = document.getElementsByClassName("top-search-input")[0];
                    //         // temp = topsearchinput.value;
                    //         if(temp!=''){
                    //            // alert(temp);
                    //             $http({
                    //                 url: '/getSearchContent',
                    //                 method: 'get',
                    //                 params: {
                    //                     "search": temp
                    //                 },
                    //                 headers: {
                    //                     'Accept': '*/*',
                    //                     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    //                 }
                    //             }).success(function (results) {
                    //                 console.log(results);
                    //                 scope.searchResultList=[];
                    //
                    //                 for(var i=0;i<results.length;i++){
                    //                     scope.searchResultList[i]={};
                    //                     scope.searchResultList[i].quesid=results[i].db_zhihu_ques_id;
                    //                     scope.searchResultList[i].title=results[i].db_zhihu_ques_title;
                    //                 }
                    //                 //console.log(scope.searchResultList);
                    //                 //alert(results);
                    //             });
                    //         }
                    //
                    //     },3000);
                    // };
                    scope.goSearchState = function (key) {
                        // 之所以点击不上，是因为先发生了blur才发生click。这时已经变了位置了点击不到。
                        var arr = [];
                        arr[0] = key;
                        if (key != null) {
                            //alert(key);
                            getContentService.getContent(arr);
                            key = encodeURI(key);
                            $state.go('home.search', {'searchKey': key});
                        }
                    }
                }
            }
        };
        return directiveDefinitionObject;
    })
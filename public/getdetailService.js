//赞同 服务
angular.module('getDetailMd', [])
    .factory('getDetailService', function commentServiceFactory($http, $rootScope, $state, jsonToStr) {
        function getAbstract(long) {
            if (long.length > 100) {
                long = long.slice(0, 100);
            }
            return long;
        }
        return {
            getdetail: function (tempid) {
                $http({
                    url: '/getdetail',
                    method: 'post',
                    data: tempid,
                    data: jsonToStr.transform(tempid),//对提交的数据格式化
                    headers: {'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).success(function (da) {//success下两种状态。
                    //console.log(da);
                    $rootScope.allresults = da;
                    var len = Object.keys(da).length;
                    for (var i = 0; i < len; i++) {
                        $rootScope.allresults[i] = da[i];
                        $rootScope.allresults[i].short = getAbstract(da[i].db_zhihu_answ_content);
                    }

                });
            }
        }
    })
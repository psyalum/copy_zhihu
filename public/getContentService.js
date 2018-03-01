//赞同 服务
angular.module('getContentMd',[])
    .factory('getContentService', function commentServiceFactory($http,$rootScope,$state,jsonToStr) {
        function getAbstract(long) {
            if (long.length > 100) {
                long = long.slice(0, 100);
                long=long+'...';
            }
            return long;
        }
        function getallfunction(){
            $http({
                url: '/getContent',
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (results) {
                $rootScope.allresults = [];
                var len = Object.keys(results).length;
                for (var i = 0; i < len; i++) {
                    $rootScope.allresults[i] = results[i + 1];
                    $rootScope.allresults[i].short = getAbstract(results[i + 1].db_zhihu_answ_content);
                }
                //console.log(results);
            });
        }
        function getserchcontent(temp){
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
                //alert(results);
                $rootScope.allresults = [];
                var len = Object.keys(results).length;
                for (var i = 0; i < len; i++) {
                    $rootScope.allresults[i] = results[i];
                    $rootScope.allresults[i].short = getAbstract(results[i].db_zhihu_answ_content);
                }
                //$state.go('home.search',{'searchKey':key});
            });
        }
        return {
            getContent:function(arr){
                if(arr.length===0){
                    getallfunction();
                }else if(arr.length===1){
                    getserchcontent(arr[0]);
                }
            }
        }
    })
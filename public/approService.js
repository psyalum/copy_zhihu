//赞同 服务
angular.module('approMd',[])
    .factory('approvalService', function approServiceFactory($http,$rootScope,jsonToStr) {
        return {
            approval: function (x) {
                appro = {
                    num: x.appro_num,
                    answid: x.db_zhihu_answ_id,
                    cookname: $rootScope.user.name,
                };
                $http({
                    url: '/approval',
                    method: 'POST',
                    data: appro,
                    data: jsonToStr.transform(appro),//对提交的数据格式化
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (da) {
                    debugger;
                    if (Object.keys(da).length == 1) {
                        x.appro_num = da.data;
                        alert('点赞成功');
                    } else {
                        x.appro_num = da.data;
                        alert('你已经赞过');
                    }
                });
            }
        }
    })
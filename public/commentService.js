//评论 服务
angular.module('commentMd', [])
    .factory('commentService', function commentServiceFactory($http, $rootScope, jsonToStr) {
        function addfirstcomment(x,event){
            postcommentdata = {
                commanswid: x.db_zhihu_answ_id,
                commusername: $rootScope.user.name,
                commuserid: $rootScope.user.id,
                commcontent: event.target.previousSibling.value
            }
            $http({
                url: '/postcomment',
                method: 'post',
                data: postcommentdata,
                data: jsonToStr.transform(postcommentdata),//对提交的数据格式化
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (da) {
                if (da === 'success') {
                    //console.log($scope.x.commentarray);
                    x.commentarray.push({
                        firstName: $rootScope.user.name,
                        firstContem: event.target.previousSibling.value,
                        secondName: null
                    });
                    event.target.previousSibling.value = '';
                }
            });
        }
        function addseccomment(x,c, event) {
            debugger;
            postseccommentdata = {
                commanswid: c.db_zhihu_answ_id,
                commusername: $rootScope.user.name,
                commsecname: c.firstName,
                commsenuserid: c.firstID,
                commuserid: $rootScope.user.id,
                commcontent: event.target.previousSibling.previousSibling.value
            }
            $http({
                url: '/postcomment',
                method: 'post',
                data: postseccommentdata,
                data: jsonToStr.transform(postseccommentdata),//对提交的数据格式化
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (da) {
                if (da === 'success') {
                    x.commentarray.push({
                        firstName: $rootScope.user.name,
                        firstContem: event.target.previousSibling.previousSibling.value,
                        secondName: postseccommentdata.commsecname
                    });
                    event.target.previousSibling.previousSibling.value = '';
                }
            });
        }

        return {
            getcomment: function (x) {
                if (x.arrow === undefined || x.arrow === 0) {
                    x.arrow = 1;
                } else {
                    x.arrow = 0;
                }
                comment = {
                    answerid: x.db_zhihu_answ_id,//获取评论只要有回答id就可以了
                    commentuserid: $rootScope.user//如果要评论则需要这个
                };
                $http({
                    url: '/comment',
                    method: 'post',
                    data: comment,
                    data: jsonToStr.transform(comment),//对提交的数据格式化
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (da) {
                    x.commentarray = da;


                });
            },
            addcomment: function (coll, event) {
                if(coll.length===1){
                    addfirstcomment(coll[0], event);
                }else if(coll.length===2){
                    addseccomment(coll[0],coll[1],event);
                }
            },
            seccommentinput: function (c, event) {
                c.discuss_sec = 1;
            },
            undiscuss_sec: function (c) {
                c.discuss_sec = 0;
            }
        }
    })
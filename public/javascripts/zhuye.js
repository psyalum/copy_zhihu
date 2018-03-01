//下面注释的这段不可以删除！消息中的显示隐藏动态效果是css实现的。如果想用jq实现还有一些问题没有解决。需要学习！
// $('.open').click(function(){
//         $('.top-nav-live').show();
// });
// $('.open').mouseleave(function(){
//     setTimeout(function(){
//         $('.top-nav-live').hide();
//     },1000);
// });
// $('.top-nav-live').hover(function(){
//     $('.top-nav-live').show();
// },function(){
//     this.hide();
// });
// $('.top-nav-live').mouseleave(function(){
//     this.hide();
// });

var obtn = document.getElementById("back-to-top");
var timer = null;
var isTop = true;
var clientHeight = document.documentElement.clientHeight/2; //可视区域的高度,到时候把/2删掉，因为为了调试除以2了。
// window.onscroll = function() {
//     osTop = document.documentElement.scrollTop; //滚动条距离顶部距离
//     if(osTop >= clientHeight) {
//         obtn.style.display = "block";
//     } else { //必须有else下面这几句，不然滑动结束到顶部后仍不会消失。
//         obtn.style.display = "none";
//     }
//     if(!isTop) { //
//         clearInterval(timer);
//     }
//     isTop = false;
// }
// obtn.onclick = function() {
//     timer = setInterval(function() {
//         osTop = document.body.scrollTop;
//         //后半句用来兼容ie
//         var ispeed = Math.floor(-osTop / 6); //必须是前面有负号的，否则会有错误，一直到达不了顶部，距离顶部始终有5像素
//         document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
//         isTop = true;
//         console.log(osTop - ispeed);
//         if(osTop == 0) {
//             clearInterval(timer);
//         }
//     }, 30);
// }
var maincontent = document.getElementsByClassName("maincontent");
var pinglun1 = document.getElementsByClassName("pinglun1");
var pinglun2 = document.getElementsByClassName("pinglun2");
var shameimarulink = document.getElementsByClassName("shameimaru-link")[0];
//var shameimaruclose = document.getElementsByClassName("shameimaru-close")[0];
var topsearchinput = document.getElementsByClassName("top-search-input")[0];
var topsearchbutton = document.getElementsByClassName("top-search-button")[0];
var hisrecord = document.getElementsByClassName("hisrecord")[0];
//右侧栏开始
$('.shameimaru-link').mouseover(function(){
        $('.shameimaru-close').toggle();
        $('.shameimaru-close').click(function(){
            $('.shameimaru-link').toggle();
            $('.shameimaru-close').toggle();
        });
});
$('.shameimaru-close').mouseover(function(){
    $('.shameimaru-close').show();
});
//右侧栏结束

for(var i = 0; i < maincontent.length; i++) {
    maincontent[i].onmouseover = function() {
        j = this.childNodes.length;
        this.childNodes[j - 2].style.display = "block";
        this.childNodes[j - 4].style.display = "none";
    }
}
for(var i = 0; i < maincontent.length; i++) {
    maincontent[i].onmouseout = function() {
        j = this.childNodes.length;
        this.childNodes[j - 4].style.display = "block";
        this.childNodes[j - 2].style.display = "none";
    }
}

function showdiv(obj) {
    var x = obj.parentNode.nextSibling;
    if(x.nodeType != 1) {
        x = x.nextSibling;
    }
    x.style.display = "block";
    obj.parentNode.style.display = "none";
}

function hidediv(obj) {
    var a = obj.parentNode.previousSibling;
    if(a.nodeType != 1) {
        a = a.previousSibling;
    }
    a.style.display = "block";
    obj.parentNode.style.display = "none";
}


var zhuye = angular.module('zhuye', ['ngCookies']);
zhuye.service('jsonToStr', function () {
    this.transform = function (jsonData) {
        var string = '';
        for (str in jsonData) {
            string = string + str + '=' + jsonData[str] + '&';
        }
        var _last = string.lastIndexOf('&');
        string = string.substring(0, _last);
        return string;
    };
});
zhuye.controller('profileCtrl', ['$scope','$http','$cookies','jsonToStr',function($scope,$http,$cookies,jsonToStr){
    debugger;
    $scope.fname=$cookies.get('name');
   // localStorage.setItem('remember',$scope.frame);

    $scope.logout=function () {
        $cookies.remove('name');
        window.location.href="login_register.html";
    }
    $scope.ShowDiv=function(show_div,bg_div){
//弹出隐藏层
    document.getElementById(show_div).style.display='block';
            document.getElementById(bg_div).style.display='block' ;
            var bgdiv = document.getElementById(bg_div);
            bgdiv.style.width = document.body.scrollWidth;
// bgdiv.style.height = $(document).height();
            $("#"+bg_div).height($(document).height());
        };
//关闭弹出层
        $scope.CloseDiv=function(show_div,bg_div)
        {
            document.getElementById(show_div).style.display='none';
            document.getElementById(bg_div).style.display='none';
        };
        $scope.postQues=function(){
            // $scope.postques={
            //     title:ques.title,
            //     content:ques.content
            // }
            if($scope.ques.title==''){
                alert('你什么都没有问');
            }else{
                if($('.ques_author').is(':checked')){
                    $scope.ques.author='';
                }else{
                    $scope.ques.author=$cookies.get('name');
                }
                $http({
                    url: '/postquestion',
                    method: 'post',
                    data: jsonToStr.transform($scope.ques),
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }).success(function (results) {
                });
            }
            }

    $scope.searchData=function(){
       // $scope.temp={};
        $scope.temp=topsearchinput.value;
        if($scope.temp==''){
            $scope.returnIndex();
        }else{
            $http({
                url: '/getSearchContent',
                method: 'get',
                params: {
                    "search":$scope.temp
                },
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (results) {
                console.log($scope.temp);
                $scope.allresults=[];
                var len=Object.keys(results).length;
                function getAbstract(long){
                    if(long.length>100){
                        long=long.slice(0,100);
                    }
                    return long;
                }
                for(var i=0;i<len;i++){
                    $scope.allresults[i]=results[i];
                    $scope.allresults[i].short=getAbstract(results[i].db_zhihu_answ_content);
                }
                history.pushState({search:$scope.temp},null,'?search='+$scope.temp);
            });
        }

    };
    $scope.returnIndex=function(){
        getContent();
        topsearchinput.value='';
        $(hisrecord).css('display','none');
        history.replaceState(null, null, location.href.split("?")[0]);
    };
    function getContent() {
        $http({
            url: '/getContent',
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).success(function (results) {
            $scope.allresults=[];
            var len=Object.keys(results).length;
            function getAbstract(long){
                if(long.length>100){
                    long=long.slice(0,100);
                }
                return long;
            }
            for(var i=0;i<len;i++){
                $scope.allresults[i]=results[i+1];
                $scope.allresults[i].short=getAbstract(results[i+1].db_zhihu_answ_content);
            }
            $scope.approData=function(x){
                //也是对的// console.log(this.x.db_zhihu_answ_id);
                $scope.appro={
                    num:x.appro_num,
                    answid:x.db_zhihu_answ_id,
                };
                $http({
                    url: '/approval',
                    method: 'POST',
                    data: $scope.appro,
                    data: jsonToStr.transform($scope.appro),//对提交的数据格式化
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }

                }).success(function (da) {
                    if(Object.keys(da).length==1){
                        x.appro_num=da.data;
                        alert('点赞成功');
                    }else{
                        x.appro_num=da.data;
                        alert('你已经赞过，请不要重复点赞');
                    }
                });
            }
        });
    };
     getContent();
}]);

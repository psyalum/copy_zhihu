$('#signin').click(function(){//登陆
    $('#signin').addClass('active');
    $('#signup').removeClass('active');
    $('.view-signin').css('display','block');
    $('.view-signup').css('display','none');
    $('.navs-slider-bar').css('left','4.5em');
});
$('#signup').click(function(){//注册
    $('#signup').addClass('active');
    $('#signin').removeClass('active');
    $('.view-signin').css('display','none');
    $('.view-signup').css('display','block');
    $('.navs-slider-bar').css('left','0em');
});
// var signUp = angular.module('mysignUp', []);
// /*创建json格式到string的转换服务*/
// /*创建json格式到string的转换服务*/
// signUp.service('jsonToStr', function () {
//     this.transform = function (jsonData) {
//         var string = '';
//         for (str in jsonData) {
//             string = string + str + '=' + jsonData[str] + '&';
//         }
//         var _last = string.lastIndexOf('&');
//         string = string.substring(0, _last);
//         return string;
//     };
// });
// signUp.controller('signInCtrl', function ($scope, $http,jsonToStr) {
//    // debugger;
//     $scope.signin = {
//         name: '赵文爽',
//         password: 'wsdrj123',
//     };
//     //angularjs的$http提交
//     $scope.signinData = function () {
//         //debugger;
//         $http({
//             url: '/login',
//             method: 'post',
//             data: $scope.signin,
//             data: jsonToStr.transform($scope.signin),//对提交的数据格式化
//             headers: {
//                 'Accept': '*/*',
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//         }).success(function (da) {//success下两种状态。
//            // debugger;
//             if(da=='success'){
//                 //console.log(locals.login);
//                 window.location.href="zhuye.html";
//             }else{
//                 alert('用户名或密码错误');
//             }
//         });
//     };
// });
//
//
//
//
//
//
//
// signUp.controller('signUpCtrl', function ($scope, $http,jsonToStr) {
//
//     $scope.user = {
//         name: '狄仁杰',
//         password: 'wsdrj123',
//         phone: '13423123312'
//     };
//     //angularjs的$http提交
//     $scope.signupData = function () {
//         // console.log(jsonToStr.transform($scope.user));
//         $http({
//             url: '/register',
//             method: 'POST',
//             data: $scope.user,
//             data: jsonToStr.transform($scope.user),//对提交的数据格式化
//             headers: {
//                 'Accept': '*/*',
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//
//         }).success(function (da) {
//             console.log(da);
//         });
//     };
// });
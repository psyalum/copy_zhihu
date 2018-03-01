/**
 * login page
 */


// $('#signin').click(function(){//登陆
//     alert('登陆');
//     // $('#signin').addClass('active');
//     // $('#signup').removeClass('active');
//     // $('.view-signin').css('display','block');
//     // $('.view-signup').css('display','none');
//     // $('.navs-slider-bar').css('left','4.5em');
// });
// $('#signup').click(function(){//注册
//     alert('注册');
//     // $('#signup').addClass('active');
//     // $('#signin').removeClass('active');
//     // $('.view-signin').css('display','none');
//     // $('.view-signup').css('display','block');
//     // $('.navs-slider-bar').css('left','0em');
// });





// angular.module('login', ['ui.router'])
//     .config(['$stateProvider',
//         function ($stateProvider) {
//             debugger;
//             $stateProvider
//                 .state("login", {
//                     url: '/login',
//                     //templateUrl: 'login.html',
//                     template:'我是登录页面显示最新',
//                     controller: function($scope,loginService,$rootScope,$state){
//                         $scope.user = {
//                             name:"",
//                             pwd:""
//                         }
//                         // $scope.loginState = true;
//                         // $scope.smEnter = function(){
//                         //     $scope.loginState = false;
//                         // }
//                         // $scope.smOuter = function(){
//                         //     $scope.loginState = true;
//                         // }
//                         $scope.subLogin = function(){
//                             $rootScope.user = loginService.login($scope.user);
//                             if($rootScope.user!=null)
//                             {
//                                 $state.go('home.main');
//                             }
//                         }
//                     },
//                     ncyBreadcrumb:{
//                         label:"登录",
//                         parent:"home_container"
//                     }
//
//                 })
//         }
//     ])
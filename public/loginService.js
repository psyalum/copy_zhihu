//用户登陆信息
angular.module('loginMd', ["swxLocalStorage"])
    .factory('loginService', function loginServiceFactory($state, $rootScope, $localStorage, $http, jsonToStr) {
        debugger;
        return {
            user: {},
            //登陆
            login: function (userLogin) {
                debugger;
                $http({
                    url: '/login',
                    method: 'post',
                    data: userLogin,
                    data: jsonToStr.transform(userLogin),//对提交的数据格式化
                    headers: {'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                }).success(function (da) {//success下两种状态。
                    debugger;
                    if (da == 'failure') {
                        alert('2   用户名或密码错误');
                    } else {
                        this.user = {};
                        $localStorage.put('curUser', userLogin.name);
                        $localStorage.put('curUserid', da.db_zhihu_user_id);
                        var oldUser = $localStorage.get('curUser');
                        this.user.name = oldUser;
                        this.user.id = da.db_zhihu_user_id;
                        $rootScope.user = this.user;
                        if ($rootScope.user.name != null) {
                            $state.go('home.main');
                        }
                        return this.user;
                    }
                });
            },
            register: function () {
                $http({
                    url: '/register',
                    method: 'POST',
                    data: user,
                    data: jsonToStr.transform(user),//对提交的数据格式化
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }

                }).success(function (da) {
                    alert('注册成功');
                });
            },
            //判断是否登录
            isLogin: function () {
                this.user = {};
                debugger;
                var oldUser = $localStorage.get("curUser");
                var oldUserid = $localStorage.get("curUserid");
                if (oldUser != null) {
                    //登陆后根据用户名创建我的购物车
                    this.user.name = oldUser;
                    this.user.id = oldUserid;
                    //cartService.createMyCart(this.user);
                    return this.user;
                }
                return null;
            },
            //退出登录
            outLogin: function () {
                this.user = null;
                $localStorage.remove("curUser");
            }
        }
    });
angular.module('popwindowMd', [])
    .directive('popwindow', function factory($rootScope) {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'popwindowTpl.html',
            scope: {
                // quesflag:'='
            },
            link: function () {
                collaspwindow=function(){
                    $rootScope.quesflag=0;
                }
                function hasClass(element, className) {
                    return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
                }
                var fade = document.getElementById('fade');
                fade.addEventListener('click',function(e){
                    var target=e.target;
                    if(hasClass(target,'black_overlay')) {
                        //alert('1');
                        $rootScope.quesflag=0;
                       // alert($rootScope.quesflag);
                        //alert('2');
                    };
                })

            }
        }
    })
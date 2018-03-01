$scope.approData = function (x) {
    approvalService.approval(x);
}
$scope.disscuData = function (x) {
    commentService.getcomment(x);
}
$scope.postComment = function (coll, event) {
    commentService.addcomment(coll,event);
}
$scope.discuss_sec_data = function (c, event) {
    commentService.seccommentinput(c,event);
}
// $scope.postsecondcomment = function (c, event) {
//     commentService.addseccomment(c,event);
// }
$scope.undiscuss_sec=function(c){
    commentService.undiscuss_sec(c);
}
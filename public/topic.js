// var obtn = document.getElementById("back-to-top");
// var timer = null;
// var isTop = true;
// var clientHeight = document.documentElement.clientHeight/2; //可视区域的高度,到时候把/2删掉，因为为了调试除以2了。
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

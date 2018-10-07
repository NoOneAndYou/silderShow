
var oLi = document.getElementsByTagName('li');
var width = oLi[0].getBoundingClientRect().width;

var prev = document.getElementById('prev');
var next = document.getElementById('next');
var btn = document.getElementsByClassName('btn');

var sort = [],
    timer = null,
    flag = true;

function init() {
    sort = Array.prototype.slice.call(oLi);
    setUp(sort);
    bindEvent();
    move();
}
init();

function setUp(arr) {
    var len = arr.length;
    var center = Math.floor(len / 2);
    arr[center].style.transform = 'scale(1.15)';
    arr[center].style.zIndex = 4;
    for (var i = 0; i < len; i ++) {
        var abs = Math.abs(i - center);
        if (i != center) {
            arr[i].style.transform = 'translateX('+ (i - center) * width / 2 +'px)';
            arr[i].style.zIndex = -abs;
        }
        flag = true;
    }
}

function bindEvent() {
    if (flag) {
        prev.addEventListener('click', function () {
            flag = false;
            sort.unshift(sort.pop());
            setUp(sort);
        });
        next.addEventListener('click', function () {
            flag = false;
            sort.push(sort.shift());
            setUp(sort);
        });
    }
    for (var i = 0; i < btn.length; i ++) {
        btn[i].addEventListener('mouseenter', function () {
            clearInterval(timer);
        });
        btn[i].addEventListener('mouseleave', function () {
            move();
        });
    }
}

function move() {
    clearInterval(timer);
    timer = setInterval(function () {
        sort.push(sort.shift());
        setUp(sort);
    }, 2000);
}
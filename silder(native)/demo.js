
var sliderList = document.getElementsByClassName('sliderList')[0];
var moveWidth = sliderList.children[0].offsetWidth;
var imgNum = sliderList.children.length - 1;

var leftBtn = document.getElementsByClassName('leftBtn')[0];
var rightBtn = document.getElementsByClassName('rightBtn')[0];

var oSpanArr = document.getElementsByClassName('sliderCircle')[0].getElementsByTagName('span');

var timer = null;
var key = true;
var index = 0;

leftBtn.onclick = function () {
    autoMove('right - left');
}

rightBtn.onclick = function () {
    autoMove('left - right');
}

for (var i = 0; i < oSpanArr.length; i ++) {
    (function (i) {
        oSpanArr[i].onclick = function () {
            key = false;
            clearTimeout(timer);
            index = i;
            startMove(sliderList, {left: -moveWidth * i}, function () {
                timer = setTimeout(autoMove, 1500);
                changeIndex(i);
                key = true;
            });
        }
    }(i))
}

function autoMove(direction) {
    if (key) {
        key = false;
        clearTimeout(timer);
        if (!direction || direction == 'left - right') {
            index ++;
            startMove(sliderList, {left: sliderList.offsetLeft - moveWidth}, function () {
                if (sliderList.offsetLeft == -moveWidth * imgNum) {
                    sliderList.style.left = 0 + 'px';
                    index = 0;
                }
                timer = setTimeout(autoMove, 1500);
                changeIndex(index);
                key = true;
            });
        }else if (direction == 'right - left') {
            if (sliderList.offsetLeft == 0) {
                sliderList.style.left = -moveWidth * imgNum + 'px';
                index = imgNum;
            }
            index --;
            startMove(sliderList, {left: sliderList.offsetLeft + moveWidth}, function () {
                timer = setTimeout(autoMove, 1500);
                changeIndex(index);
                key = true;
            });
        }
    }
}

timer = setTimeout(autoMove, 1500);

function changeIndex(_index) {
    for (var i = 0; i < oSpanArr.length; i ++) {
        oSpanArr[i].className = '';
    }
    oSpanArr[_index].className = 'active';
}

function startMove(obj, json, callback) {
    clearInterval(obj.timer);
    var iSpeed, iCur;
    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            if (attr == 'opacity') {
                iCur = parseFloat( getStyle(obj, 'opacity') ) * 100;
            }else{
                iCur = parseInt( getStyle(obj, attr) );
            }
            iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else{
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (iCur != json[attr]) {
                bStop = false;
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            typeof callback == 'function' ? callback() : '';
        }
    }, 30);
}

function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}

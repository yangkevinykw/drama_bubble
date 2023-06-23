// Filename: timeline.js
// Function: develop.html's scrolling effect
// Progarmmer: Tony

// display size
const WINDOW_WIDTH = document.body.clientWidth;
const WINDOW_HEIGHT = document.body.clientHeight;

const ARROW_IMG = ['<img src="res/software/arrow_down.png" alt="Arrow">', '<img src="res/software/arrow_up.png" alt="Arrow">']

const DELAY = 50;

var frame = document.getElementsByClassName("frame")[0];
var contentList = document.getElementsByClassName("content");
var contentNum = contentList.length;
var curContentId;

var textList = document.getElementsByClassName("text");

var button = document.getElementsByClassName("down")[0];

function init_timeline() {
    frame.style.height = WINDOW_HEIGHT * contentNum + "px";
    frame.style.top = "0px";
    for (var i = 0; i < contentNum; i++) {
        contentList[i].style.height = WINDOW_HEIGHT + "px";
    }
    curContentId = -1;

    button.onclick = function() {
        pagedown();
    };

    showText(0);
    curContentId = 0;
}

function pagedown() {
    id = curContentId + 1;

    if (id == contentNum) {
        id = 0;
    }

    // console.log("Change to: " + id);
    var curTop = parseInt(frame.style.top);
    var destTop = -id * WINDOW_HEIGHT;

    var top;
    for (var i = 0; i < 100; i++) {
        (function(_i) {
            setTimeout(function() {
                // console.log(_i)
                top = (_i * destTop + (100 - _i) * curTop) / 100;
                frame.style.top = top + "px";
                console.log("--- " + top);
            }, Math.sqrt(_i) * DELAY);
        })(i);
    }
    setTimeout(pagelock, Math.sqrt(100) * DELAY, id);
    showText(id);

    curContentId = id;

    if (curContentId == contentNum - 1) {
        button.innerHTML = ARROW_IMG[1];
    } else {
        button.innerHTML = ARROW_IMG[0];
    }
}

// lock page without delay
function pagelock(id) {
    frame.style.top = -id * WINDOW_HEIGHT + "px";
}

function init_text() {
    for (var i = 0; i < textList.length; i++) {
        textList[i].style.opacity = "0%";
    }
}

function showText(id) {
    if (curContentId != -1)
        hideText(curContentId);
    textList[id].style.zIndex = 11;
    textList[id].style.opacity = "100%";
}

function hideText(id) {
    textList[id].style.zIndex = 10;
    textList[id].style.opacity = "0%";
}

init_text();
init_timeline();
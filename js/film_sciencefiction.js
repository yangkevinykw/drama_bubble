// display size
const WINDOW_WIDTH = document.body.clientWidth;
const WINDOW_HEIGHT = document.body.clientHeight;
const CENTER_X = WINDOW_WIDTH / 2;
const CENTER_Y = WINDOW_HEIGHT / 2;

// picture size, unit is px
const TABLE_WIDTH = 500;
const TABLE_HEIGHT = 200;
const PHOTO_WIDTH = 100;
const PHOTO_HEIGHT = 120;

// info size, unit is px
const INFO_WIDTH = [50, 80];

const linkList = [
    "../FilmsHtml/SFFilms/Interstellar.html",
    "../FilmsHtml/SFFilms/流浪地球2.html",
    "../FilmsHtml/SFFilms/Inception.html",
    "../FilmsHtml/SFFilms/2001 A Space Odyssey.html",
    "../FilmsHtml/SFFilms/黑客帝国.html",
    "../FilmsHtml/SFFilms/Ready Player One.html",
    "../FilmsHtml/SFFilms/Avatar.html",
    "",
    "",
];

var snippetList;
var snippetId;

function init_table() {
    // center of the round table
    var center_x = CENTER_X;
    var center_y = CENTER_Y * 1.1;

    // init table
    var table = document.getElementsByClassName("table")[0];
    table.style.left = center_x + "px";
    table.style.top = center_y + "px";

    // init 9 photo and their snippets
    var left, right, step;
    var m, n, scale;

    // init 9 photo
    var photoList = document.getElementsByClassName("photo");
    left = center_x - TABLE_WIDTH / 2 - PHOTO_WIDTH / 2;
    right = center_x + TABLE_WIDTH / 2 + PHOTO_WIDTH / 2;
    step = (right - left) / 4;

    // men's formula is an oval
    // m = 30, n = 4
    // scale is 1 : 60
    m = 30;
    n = 4;
    scale = 60;

    // 5 men behind the table
    for (var i = 0; i < 5; i++) {
        var x = ((left + i * step) - center_x) / scale;
        var y = Math.sqrt(n * (1 - x * x / m)) * scale;

        photoList[i].style.left = left + i * step + "px";
        photoList[i].style.top = center_y - y - PHOTO_HEIGHT / 4 + "px";
        photoList[i].style.zIndex = 14;
    }
    // 4 men in front of the table
    left = center_x - TABLE_WIDTH / 2;
    right = center_x + TABLE_WIDTH / 2;
    step = (right - left) / 3;
    for (var i = 0; i < 4; i++) {
        var x = ((left + i * step) - center_x) / scale;
        var y = Math.sqrt(n * (1 - x * x / m)) * scale;

        photoList[i + 5].style.left = left + i * step + "px";
        photoList[i + 5].style.top = center_y + y - PHOTO_HEIGHT / 3 + "px";
        photoList[i + 5].style.zIndex = 16;
    }

    snippetList = document.getElementsByClassName("snippet");
    snippetId = -1;

    // add event to PHOTO
    for (var i = 0; i < 9; i++) {
        (function(j) {
            photoList[j].onmouseover = function() {
                (function(id) {
                    setSnippet(id);
                })(j);
            };
            photoList[j].onmouseout = function() {
                clearSnippet();
            };
            photoList[j].onclick = function() {
                window.location.href = linkList[j];
            }
        })(i);
    }

    // init info img
    var infoList = document.getElementsByClassName("info");
    left = center_x - infoList.length * 80 / 2;
    right = center_x + infoList.length * 80 / 2;
    step = (right - left) / (infoList.length - 1);

    console.log(left + " " + right + " " + step);
    for (var i = 0; i < infoList.length; i++) {
        infoList[i].style.width = INFO_WIDTH[i] + "px";
        infoList[i].style.left = left + i * step + "px";
        infoList[i].style.top = center_y - 40 + "px";
        (function(j) {
            infoList[j].onmouseover = function() {
                (function(id) {
                    setSnippet(id);
                })(j + photoList.length);
            };
            infoList[j].onmouseout = function() {
                clearSnippet();
            };
            infoList[j].onclick = function() {
                window.location.href = linkList[j + photoList.length];
            }
        })(i);
    }

    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

}


function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    // add class for obj
    if (!this.hasClass(obj, cls)) {
        obj.className += " " + cls;
    }
}

function removeClass(obj, cls) {
    // remove class of the obj
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}

function setSnippet(id) {
    if (snippetId != -1) {
        clearSnippet();
    }
    snippetList[id].style.opacity = "100%";
    snippetList[id].style.zIndex = 11;
    snippetId = id;
}

function clearSnippet() {
    snippetList[snippetId].style.opacity = "0%";
    snippetList[snippetId].style.zIndex = 10;
    snippetId = -1;
}

// init_table();
document.body.onload = function() {
    init_table();
}
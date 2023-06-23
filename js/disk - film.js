// Filename: disk.js
// Function: computer disk effect
// Programmer: Tony

// display size
const WINDOW_WIDTH = document.body.clientWidth;
const WINDOW_HEIGHT = document.body.clientHeight;

// const DELAY = 12;
const TOTAL_TIME = 150;

// disk info
const DISK_RADIUS = WINDOW_HEIGHT / 2;
const DISK_WIDTH = WINDOW_WIDTH / 4; // left margin

const DISK_CENTER_X = DISK_WIDTH;
const DISK_CENTER_Y = DISK_RADIUS;

const linkList = [
    "FilmsHtml/Comedy.html",
    "FilmsHtml/Science_Fiction.html",
    "FilmsHtml/Animation.html",
    "FilmsHtml/Romance.html",
    "FilmsHtml/Action.html",
    "FilmsHtml/Fantasy.html",
    "FilmsHtml/Drama.html",
    "FilmsHtml/Musical_Films.html",
    "FilmsHtml/Biography.html",
    "FilmsHtml/Historical.html",
    "FilmsHtml/Disaster.html",
    "FilmsHtml/Horror.html"
];

var disk = document.getElementsByClassName("disk")[0];
var trackList = [];
var trackNum;
var curTrackId;

var snippetList;

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

class Track {
    // obj      -- the dis it attaches to
    // x, y     -- position
    constructor(obj, id, radius, deg) {
        this.obj = obj;
        this.id = id;
        this.radius = radius;
        this.deg = deg;

        (function(obj, i) {
            obj.onclick = function() {
                if (i == curTrackId) {
                    window.location.href = linkList[i];
                } else {
                    rotateTo(i);
                }

            };
        })(this.obj, this.id);

        this.obj.style.left = DISK_CENTER_X + this.radius + "px";
        this.obj.style.top = DISK_CENTER_Y + "px";
        this.obj.style.transformOrigin = "-" + this.radius + "px " + "50%";
    }

    convert(deg) {
        if (deg >= 90) {
            return deg - 180;
        } else {
            return deg;
        }
    }

    rotate(deg) {
        this.deg = this.convert(this.deg + deg);
    }

    draw() {
        this.obj.style.transform = "rotate(" + this.deg + "deg)";
    }
}

function init_disk() {
    // disk shape
    disk.style.height = WINDOW_HEIGHT + "px";
    disk.style.width = DISK_RADIUS + DISK_WIDTH + "px";
    disk.style.borderTopRightRadius = DISK_RADIUS + "px";
    disk.style.borderBottomRightRadius = DISK_RADIUS + "px";

    disk.style.backgroundImage = "radial-gradient(" + DISK_WIDTH + "px " + DISK_RADIUS + "px" + ", #123E4E 15%, #CAC4B7 20%, #123E4E 25%, #CAC4B7 30%, #CAC4B7 40%, #123E4E 41%, #CAC4B7 45%, #CAC4B7 90%, #123E4E 95%)";

    disk.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

    // track position
    var tempTrackList = document.getElementsByClassName("track");
    trackNum = tempTrackList.length;
    var step = 180 / trackNum;
    for (var i = 0; i < trackNum; i++) {
        var deg = -90 + step * i;
        trackList.push(new Track(tempTrackList[i], i, DISK_RADIUS * 0.35, deg));
        trackList[i].draw();
    }

    curTrackId = -1;
    locateTo(Math.floor(Math.random() * trackNum));
    // setTimeout(rotateTo, 300, Math.floor(Math.random() * trackNum));

    document.getElementById("turn").onclick = function() {
        rotateTo(curTrackId - 1);
    }
}

function degToRad(deg) {
    return deg / 180 * Math.PI;
}

// dynamic effect
function rotateTo(id) {
    var destDeg;

    if (id == curTrackId)
        return;

    if (id >= trackNum) {
        id = 0;
    } else if (id < 0) {
        id = trackNum - 1;
    }

    if (curTrackId != -1) {
        removeClass(trackList[curTrackId].obj, "onshow");
    }

    if (trackList[id].deg < 0) {
        destDeg = -trackList[id].deg;
    } else {
        destDeg = 180 - trackList[id].deg;
    }

    var step = 2;
    var delay = Math.min(TOTAL_TIME / destDeg * step, 12);
    for (var i = 0; i < destDeg; i += step) {
        setTimeout(function() {
            for (var j = 0; j < trackNum; j++) {
                trackList[j].rotate(step);
                trackList[j].draw();
            }
        }, i * delay);
    }

    setTimeout(locateTo, delay * destDeg + 5, id);
}

// final locate
function locateTo(id) {
    var destDeg;

    if (id == curTrackId)
        return;

    if (trackList[id].deg < 0) {
        destDeg = -trackList[id].deg;
    } else {
        destDeg = 180 - trackList[id].deg;
    }

    for (var j = 0; j < trackNum; j++) {
        trackList[j].rotate(destDeg);
        trackList[j].draw();
    }

    if (curTrackId != -1) {
        removeClass(trackList[curTrackId].obj, "onshow");
    }
    addClass(trackList[id].obj, "onshow");

    showSnippet(id);
    curTrackId = id;
}

function showSnippet(id) {
    if (curTrackId != -1)
        hideSnippet(curTrackId);
    snippetList[id].style.zIndex = 19;
    snippetList[id].style.opacity = "100%";
}

function hideSnippet(id) {
    snippetList[id].style.zIndex = 18;
    snippetList[id].style.opacity = "0%";
}

function init_snippet() {
    snippetList = document.getElementsByClassName("snippet");
    for (var i = 0; i < snippetList.length; i++) {
        snippetList[i].style.opacity = "0%";

        // content
        var str = snippetList[i].innerHTML;
        str = '<div class="head"><h3>- Brief -</h3></div>' + str + '<div class="link">More</div>';
        snippetList[i].innerHTML = str;

        // link
        (function(j) {
            snippetList[j].getElementsByClassName("link")[0].onclick = function() {
                window.location.href = linkList[j];
            }
        })(i);
    }
}


init_snippet();
init_disk();
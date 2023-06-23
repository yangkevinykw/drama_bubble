// Filename: sidebar.js
// Function: sidebar's effect
// Programmer: Tony

// here use relative width
const ARROW_WIDTH = 10;
const SIDEBAR_WIDTH = 15;
const ARROW = ['<img src="res/arrow_right.png" alt="arrow">', '<img src="res/arrow_left.png" alt="arrow">']

var arrow = document.getElementById("arrow");
var sidebar = document.getElementById("sidebar");

// sidebar is hidden or not
var isHidden;

function init_sidebar() {
    arrow.style.left = "0%";
    arrow.innerHTML = ARROW[0];
    arrow.onclick = function() {
        switchDisplay();
    }

    sidebar.style.left = -SIDEBAR_WIDTH + "%";

    // except sidebar
    // document.body.get.addEventListener("click", hideSidebar);

    isHidden = true;
}

// hide or reveal sidebar
function switchDisplay() {
    if (isHidden) {
        arrow.style.left = SIDEBAR_WIDTH + "%";
        arrow.innerHTML = ARROW[1];
        sidebar.style.left = "0%";
    } else {
        arrow.style.left = "0%";
        arrow.innerHTML = ARROW[0];
        sidebar.style.left = -SIDEBAR_WIDTH + "%";
    }
    isHidden = !isHidden;
}

// hide sidebar
function hideSidebar() {
    console.log("???");
    if (isHidden) {
        return;
    }
    arrow.style.left = "0%";
    arrow.innerHTML = ARROW[0];
    sidebar.style.left = -SIDEBAR_WIDTH + "%";
    isHidden = !isHidden;
}

// show time
function showTime() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth()+1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    hour = check(hour);
    minute = check(minute);
    second = check(second);

    var msg = "";
    msg += year + "/" + month + "/" + date + "<br>";
    msg += hour + ":" + minute + ":" + second;
    // console.log(msg);
    document.getElementById("time").innerHTML = msg;
    setTimeout(showTime, 1000);
}

function check(num) {
    if (num < 10) {
        num = '0' + num;
    }

    return num;
}

init_sidebar();
showTime();
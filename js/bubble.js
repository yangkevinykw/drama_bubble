// Filename: bubble.js
// Function: mainpage's bubble effect
// Progarmmer: Tony

// display size
const WINDOW_WIDTH = document.body.clientWidth;
const WINDOW_HEIGHT = document.body.clientHeight;
const CENTER_X = WINDOW_WIDTH / 2;
const CENTER_Y = WINDOW_HEIGHT / 2;

// moving bound of bubbles
const OUTER_RADIUS = Math.floor(WINDOW_WIDTH * 0.425);
const INNER_RADIUS = Math.floor(WINDOW_WIDTH * 0.2);
const bubblecolors = ["#5b6a73", "#7c3220", "#293719", "#969674","A6754C","#90955c","#F48350"]
// FPS
const DELAY = 10;

// floating bubble
class Bubble {
    // obj      -- the div it controls
    // x, y     -- position
    // radius   -- radius
    // speed    -- moving speed
    // inner_radius -- minimum range
    // outer_radius -- maximum range
    // rad      -- moving direction
    // url      -- when clicked, jump to target url in current window
    // isCustom -- whether to be set by user or random
    constructor(obj, isCustom, x = 0, y = 0, radius = 0, v = 0, inner_radius = 0, outer_radius = 0, url = "") {
        this.obj = obj;
        this.isCustom = isCustom;

        if (isCustom) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.v = v;
            this.inner_radius = inner_radius;
            this.outer_radius = outer_radius;
        } else {
            // random property
            this.x = CENTER_X;
            this.y = CENTER_Y;
            this.radius = randomNumber(20, 50);
            this.v = 1.0 / this.radius * 100;
            this.inner_radius = -WINDOW_WIDTH;
            this.outer_radius = WINDOW_WIDTH;

            this.obj.style.width = this.radius * 1.8 + "px";
            this.obj.style.height = this.radius * 1.8 + "px";
            this.obj.style.backgroundColor = randomColor(0.5);
            this.obj.style.border = this.radius * 0.2 + "px solid " + randomColor(0.5);
            this.obj.style.cursor = "default";
        }

        var rad = randomRad(0, 360);
        this.vx = this.v * Math.cos(rad);
        this.vy = this.v * Math.sin(rad);

        // init style
        this.obj.style.left = (x - this.radius) + "px";
        this.obj.style.top = (y - this.radius) + "px";
        if (url != "") {
            this.obj.onclick = function() {
                window.location.href = url;
            };
        }

        // console.log("SIZE:   " + WINDOW_WIDTH + " " + WINDOW_HEIGHT);
        // console.log("CENTER: " + CENTER_X + " " + CENTER_Y);
        // console.log("POS: " + this.x + " " + this.y);
        // console.log("V: " + this.vx + " " + this.vy);
        // console.log("RADIUS: " + INNER_RADIUS + " " + OUTER_RADIUS);
    }

    // change color
    changeColor() {
        this.obj.style.backgroundColor = randomColor(0.5);
        this.obj.style.border = this.radius * 0.2 + "px solid " + randomColor(0.5);
    }

    // change moving direction
    bounce(nx, ny) {
        // console.log("R: " + nx + " " + ny + " | " + this.vx + " " + this.vy);
        // window.alert("bounce");
        // nx, ny: normal line direction
        var e = getModule(nx, ny);
        var k = 2 * Math.abs((this.vx * nx + this.vy * ny) / e);
        this.vx += k * nx / e;
        this.vy += k * ny / e;

        // direction change
        var rad = randomRad(-10, 10);
        var tx = this.vx * Math.cos(rad) - this.vy * Math.sin(rad);
        var ty = this.vx * Math.sin(rad) + this.vy * Math.cos(rad);
        this.vx = tx;
        this.vy = ty;

        e = getModule(this.vx, this.vy);
        this.vx *= 1.0 * this.v / e;
        this.vy *= 1.0 * this.v / e;

        if (!this.isCustom && randomBool())
            this.changeColor();
    }

    // move
    move() {
        // new position
        var x = this.x + this.vx;
        var y = this.y + this.vy;

        // collision with window
        if (x - this.radius <= 0) {
            x = this.radius;
            this.bounce(1, 0);
        } else if (x + this.radius >= WINDOW_WIDTH) {
            x = WINDOW_WIDTH - this.radius;
            this.bounce(-1, 0);
        }

        if (y - this.radius <= 0) {
            y = this.radius;
            this.bounce(0, 1);
        } else if (y + this.radius >= WINDOW_HEIGHT) {
            y = WINDOW_HEIGHT - this.radius;
            this.bounce(0, -1);
        }

        var dis = getDistance(x, y, CENTER_X, CENTER_Y);
        // console.log("DIS: " + dis + " " + (this.inner_radius + this.radius) + " " + (this.outer_radius - this.radius));
        // inner collision
        if (dis < this.inner_radius + this.radius) {
            // console.log("INNER");
            this.bounce(x - CENTER_X, y - CENTER_Y);
        }
        // outer collision
        if (dis > this.outer_radius - this.radius) {
            // console.log("OUTTER");
            this.bounce(CENTER_X - x, CENTER_Y - y);
        }

        this.x = x;
        this.y = y;
        this.obj.style.left = (x - this.radius) + "px";
        this.obj.style.top = (y - this.radius) + "px";
        // console.log("POS: " + x + " " + y);
    }
}

function randomNumber(left, right) {
    return Math.random() * (right - left) + left;
}

function randomRad(left, right) {
    return randomNumber(left, right) / 180.0 * Math.PI;
}

function randomBool() {
    return (Math.floor(Math.random() * 10) == 1) ? true : false;
}

function randomColor(alpha = 1.0) {
    var r=Math.floor(Math.random()*bubblecolors.length);
    return bubblecolors[r];
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function getModule(x, y) {
    return Math.sqrt(x * x + y * y);
}

var divList = document.getElementsByClassName("bubble");
var bubbles = [];
// init styles
function init_bubbles() {
    // Computer Science
    bubbles.push(new Bubble(divList[0], true, CENTER_X, CENTER_Y, 140, 0.2, -WINDOW_WIDTH, INNER_RADIUS, "index.html"));
    // Engineering, Theory, Application
    bubbles.push(new Bubble(divList[1], true, CENTER_X, CENTER_Y, 110, 1.3, -WINDOW_WIDTH, OUTER_RADIUS, "Film_introduction.html"));
    bubbles.push(new Bubble(divList[2], true, CENTER_X, CENTER_Y, 110, 1.1, -WINDOW_WIDTH, OUTER_RADIUS, "Document_introduction.html"));
    bubbles.push(new Bubble(divList[3], true, CENTER_X, CENTER_Y, 110, 1.0, -WINDOW_WIDTH, OUTER_RADIUS, "Musical_introduction.html"));
    for (var i = 4; i < divList.length; i++)
        bubbles.push(new Bubble(divList[i], false));

    draw();
}

function draw() {
    move_bubble();
}

function move_bubble() {
    for (var i = 0; i < bubbles.length; i++) {
        for (var j = i + 1; j < bubbles.length; j++)
            collide_bubble(i, j);
        bubbles[i].move();
    }
    setTimeout(move_bubble, DELAY);
}

function collide_bubble(i, j) {
    var r1 = bubbles[i].radius;
    var r2 = bubbles[j].radius;

    var x1 = bubbles[i].x;
    var y1 = bubbles[i].y;
    var x2 = bubbles[j].x;
    var y2 = bubbles[j].y;

    if ((x1 == x2) && (y1 == y2))
        return;
    var dis = getDistance(x1, y1, x2, y2);

    if (dis < r1 + r2) {
        bubbles[i].bounce(x1 - x2, y1 - y2);
        bubbles[j].bounce(x2 - x1, y2 - y1);
    }
}


// execute
init_bubbles();
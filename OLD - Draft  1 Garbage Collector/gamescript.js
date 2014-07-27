// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/matrixbg.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.jpg";

// Garbage image
var garbageReady = false;
var garbageImage = new Image();
garbageImage.onload = function () {
    garbageReady = true;
};
garbageImage.src = "images/garbage.jpg";

// Game objects
var hero = {
    speed: 256 // movement in pixels per second
};

var garbageSpeed = 20;

var garbage = {
    speed: garbageSpeed
};

var garbageCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a garbage
var init = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height - 10;

    // Throw the garbage somewhere on the screen randomly
    garbage.x = 32 + (Math.random() * (canvas.width - 64));
    garbage.y = 10;
};

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    // Garbage Movement
    garbage.y += garbage.speed * modifier;

    // Collision Detection
    if (
        hero.x <= (garbage.x + 50)
        && garbage.x <= (hero.x + 50)
        && hero.y <= (garbage.y + 50)
        && garbage.y <= (hero.y + 50)
        ) {
        garbageCaught += 1;
        garbageSpeed += 5;

    }

    // Bounds Detection
    if(hero.x > canvas.width - 101) {
        hero.x = canvas.width - 101;
    }
    if(hero.x < 1) {
        hero.x = 1;
    }


};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (garbageReady) {
        ctx.drawImage(garbageImage, garbage.x, garbage.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Garbage Collected: " + garbageCaught, 32, 32);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
init();
main();
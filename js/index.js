const canvas = document.getElementById('canvas');
const _score = document.getElementById('score');
const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');
const ctx = canvas.getContext('2d');

var velocityX = 0;
var velocityY = 0;
var positionX = 10;
var positionY = 10;
var gridSize = 20;
var tileCount = 20;
var appleX = 15;
var appleY = 15;
var trail = [];
var tail = 5;
var score = 0;

document.addEventListener('keydown', keyPush);

setInterval(game, 1000 / 10);

function game() {
    positionX += velocityX;
    positionY += velocityY;

    if (positionX < 0) {
        positionX = tileCount - 1;
    }

    if (positionX > tileCount - 1) {
        positionX = 0;
    }

    if (positionY < 0) {
        positionY = tileCount - 1;
    }

    if (positionY > tileCount - 1) {
        positionY = 0;
    }

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x === positionX && trail[i].y === positionY) {
            tail = 5;
            score = 0;
            _score.textContent = `Score: ${score}`;
        }
    }
    trail.push({
        x: positionX,
        y: positionY
    });

    while (trail.length > tail) {
        trail.shift();
    }

    if (appleX === positionX && appleY === positionY) {
        tail++;
        score++;
        _score.textContent = `Score: ${score}`;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
    }

    ctx.fillStyle = "#f00";
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            velocityX = -1;
            velocityY = 0;
            break;
        case 65:
            velocityX = -1;
            velocityY = 0;
            break;
        case 38:
            velocityX = 0;
            velocityY = -1;
            break;
        case 87:
            velocityX = 0;
            velocityY = -1;
            break;
        case 39:
            velocityX = 1;
            velocityY = 0;
            break;
        case 68:
            velocityX = 1;
            velocityY = 0;
            break;
        case 40:
            velocityX = 0;
            velocityY = 1;
            break;
        case 83:
            velocityX = 0;
            velocityY = 1;
            break;
    }
}
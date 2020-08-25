var canvas;
var canvasContext;
var snake;
var foodPointList;
var foodPoint;

var DIRECTION = {
    NORTH : 0,
    EAST : 1,
    SOUTH : 2,
    WAST : 3
}

const MAP_MATRIX_LENGTH = 8;
const MAP_MATRIX_WIDTH = 10;
const MAP_MATRIX_HEIGHT= 10;
var MAP_MATRIX = new Array(8);
for (let i = 0; i < MAP_MATRIX_LENGTH; i++) {
    MAP_MATRIX[i] = new Array(8);
    for (let j = 0; j < MAP_MATRIX_LENGTH; j++) {
        MAP_MATRIX[i][j] = 0;
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.drawPoint = function(canvas, canvasContext) {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(this.x * MAP_MATRIX_WIDTH, this.y * MAP_MATRIX_HEIGHT, MAP_MATRIX_WIDTH, MAP_MATRIX_HEIGHT);
}

function FoodPointList() {
    this.foodPointList = new Array(MAP_MATRIX_LENGTH * MAP_MATRIX_LENGTH);
}

FoodPointList.prototype.init = function() {
    for (let i = 0; i < MAP_MATRIX_LENGTH; i++) {
        for (let j = 0; j < MAP_MATRIX_LENGTH; j++) {
            this.foodPointList.push(new Point(i, j));
        }
    }
}

FoodPointList.prototype.getAvailableFoodPointList = function() {
    let availableFoodPointList = new Array();
    for (let i = 0; i < MAP_MATRIX_LENGTH; i++) {
        for (let j = 0; j < MAP_MATRIX_LENGTH; j++) {
            availableFoodPointList.push(new Point(i, j));
        }
    }   

    for (let i = 0; i < snake.body.length; i++) {
        for (let j = 0; j < availableFoodPointList.length; j++) {
            if (snake.body[i].x === availableFoodPointList[j].x && snake.body[i].y === availableFoodPointList[j].y ) {
                availableFoodPointList.splice(j, 1);
            }
        }
    }

    console.log(availableFoodPointList);
    return availableFoodPointList;
}

FoodPointList.prototype.getRandomFoodPoint = function() {
    let availableFoodPointList = this.getAvailableFoodPointList();
    let random = Math.floor(Math.random() * (availableFoodPointList.length - 1 - 0 + 1) + 0);
    let randomPoint = availableFoodPointList[random];

    return randomPoint;
}

function Snake(body, direction, timeBetweenTwoPoint) {
    this.body = body;
    this.direction = direction;

    this.timeBetweenTwoPoint = timeBetweenTwoPoint;
}

Snake.prototype.setDirection = function(direction) {
    this.direction = direction;
}

Snake.prototype.canEatFoodPoint= function() {
    if (this.direction === DIRECTION.NORTH) {
        if (foodPoint.x === this.body[0].x && foodPoint.y + 1 === this.body[0].y) {
            return true;
        }
    }
    else if (this.direction === DIRECTION.EAST) {
        if (foodPoint.x - 1 === this.body[0].x && foodPoint.y === this.body[0].y) {
            return true;
        }
    }
    else if (this.direction === DIRECTION.SOUTH) {
        if (foodPoint.x === this.body[0].x && foodPoint.y - 1 === this.body[0].y) {
            return true;
        }
    }
    else if (this.direction === DIRECTION.WAST) {
        if (foodPoint.x + 1 === this.body[0].x && foodPoint.y === this.body[0].y) {
            return true;
        }
    }

    return false;
}

Snake.prototype.eatFoodPoint = function() {
    this.body.splice(0, 0, foodPoint);
}

Snake.prototype.moveOnePoint = function() {
    let head = this.body[0];

    if (this.direction === DIRECTION.NORTH) {
        if (head.y - 1 < 0) {
            return false;
        }

        this.body.unshift(new Point(head.x, head.y - 1));
    }
    else if (this.direction === DIRECTION.EAST) {
        if (head.x + 1 >= MAP_MATRIX_LENGTH) {
            return false;
        }

        this.body.unshift(new Point(head.x + 1, head.y));
    }
    else if (this.direction === DIRECTION.SOUTH) {
        if (head.y + 1 >= MAP_MATRIX_LENGTH) {
            return false;
        }

        this.body.unshift(new Point(head.x, head.y + 1));
    }
    else if (this.direction === DIRECTION.WAST) {
        if (head.x - 1 < 0) {
            return false;
        }

        this.body.unshift(new Point(head.x - 1, head.y));
    }

    if (this.newHeadInBody()) {
        return false;
    }

    this.body.pop();
    return true;
}

Snake.prototype.moving = function(canvas, canvasContext) {
    let that = this;
    this.running = setInterval(function () {
        if (that.body.length === MAP_MATRIX_LENGTH * MAP_MATRIX_LENGTH) {
            clearInterval(that.running);
            alert("good game");
            return;
        }

        if (that.canEatFoodPoint()) {
            that.eatFoodPoint(foodPoint);
            foodPoint = foodPointList.getRandomFoodPoint();
            foodPoint.drawPoint(canvas, canvasContext);
            that.drawSnakeHead(canvas, canvasContext);
            return;
        }

        let preSnakeTail = that.body[that.body.length - 1];
        let moveResult = that.moveOnePoint();
        if (moveResult) {
            that.clearSnakePreTail(canvas, canvasContext, preSnakeTail);
            that.drawSnakeHead(canvas, canvasContext);
        }
        else {
            clearInterval(that.running);
            alert("game over");
        }
    }, that.timeBetweenTwoPoint);
}

Snake.prototype.drawSnake = function(canvas, canvasContext) {
    for (let i = 0; i < this.body.length; i++) {
        canvasContext.fillStyle = "white";
        canvasContext.fillRect(this.body[i].x * MAP_MATRIX_WIDTH, this.body[i].y * MAP_MATRIX_HEIGHT, MAP_MATRIX_WIDTH, MAP_MATRIX_HEIGHT);
    }
}

Snake.prototype.drawSnakeHead = function(canvas, canvasContext) {
    canvasContext.fillStyle = "white";
    canvasContext.fillRect(this.body[0].x * MAP_MATRIX_WIDTH, this.body[0].y * MAP_MATRIX_HEIGHT, MAP_MATRIX_WIDTH, MAP_MATRIX_HEIGHT);
}

Snake.prototype.clearSnakePreTail = function(canvas, canvasContext, preTail) {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(preTail.x * MAP_MATRIX_WIDTH, preTail.y * MAP_MATRIX_HEIGHT, MAP_MATRIX_WIDTH, MAP_MATRIX_HEIGHT);
}

Snake.prototype.newHeadInBody = function() {
    for (let i = 1; i < this.body.length; i++) {
        if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
            return true;
        }
    }

    return false;
}

canvas = document.getElementById("canvas");
canvas.height = MAP_MATRIX_LENGTH * MAP_MATRIX_WIDTH;
canvas.width  = MAP_MATRIX_LENGTH * MAP_MATRIX_HEIGHT;
canvas.style.backgroundColor = "black"
canvasContext = canvas.getContext("2d");

foodPointList = new FoodPointList();
foodPointList.init();
foodPoint = new Point(5, 2);
foodPoint.drawPoint(canvas, canvasContext);

let body = new Array();
body.push(new Point(3, 2));
body.push(new Point(2, 2));
body.push(new Point(1, 2));
snake = new Snake(body, DIRECTION.EAST, 500);
snake.drawSnake(canvas, canvasContext);
snake.moving(canvas, canvasContext);

window.onkeydown = function(event) {
    if (event.key === 'ArrowUp' && snake.direction !== DIRECTION.SOUTH) {
        snake.setDirection(DIRECTION.NORTH);
    }
    else if (event.key === 'ArrowDown' && snake.direction !== DIRECTION.NORTH) {
        snake.setDirection(DIRECTION.SOUTH);
    }
    else if (event.key === 'ArrowRight' && snake.direction !== DIRECTION.WAST) {
        snake.setDirection(DIRECTION.EAST);
    }
    else if (event.key === 'ArrowLeft' && snake.direction !== DIRECTION.EAST) {
        snake.setDirection(DIRECTION.WAST);
    }
}
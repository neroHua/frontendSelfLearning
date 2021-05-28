const GAME_STATUS = {
    NOT_START : 0,
    RUNNING : 1,
    END : 2,
}

const DIRECTION = {
    NORTH : 0,
    EAST : 1,
    SOUTH : 2,
    WAST : 3
}

const MAP_LENGTH = {
    GRID_WIdTH : 8,
    GRID_HEIGHT : 8,
    GRID_GAP_WIdTH : 2,
    GRID_GAP_HEIGHT : 2,
}

const COLOR = {
    RED : "red",
    BLACK : "black",
    WHITE : "white",
    GREEN : "green",
}

function Game(mapSize, direction, timeBetweenTwoPoint) {
    this.map = new Map(mapSize, mapSize);
    this.food = new Food();
    this.snake = new Snake();

    this.gateStatus = GAME_STATUS.NOT_START;

    this.direction = direction;
    this.timeBetweenTwoPoint = timeBetweenTwoPoint;
}

Game.prototype.init = function() {
    this.map.init();
    this.food.init();
    this.snake.init();
    this.initKeyDown();

    this.map.drawMap();
    this.food.drawFood();
    this.snake.drawSnake();
}

Game.prototype.initKeyDown = function() {
    let that = this;
    window.onkeydown = function(event) {
        if (event.key === 'ArrowUp' && that.direction !== DIRECTION.SOUTH) {
            that.direction = DIRECTION.NORTH;
        }
        else if (event.key === 'ArrowDown' && that.direction !== DIRECTION.NORTH) {
            that.direction = DIRECTION.SOUTH;
        }
        else if (event.key === 'ArrowRight' && that.direction !== DIRECTION.WAST) {
            that.direction = DIRECTION.EAST;
        }
        else if (event.key === 'ArrowLeft' && that.direction !== DIRECTION.EAST) {
            that.direction = DIRECTION.WAST;
        }
    }
}

Game.prototype.start = function() {
    let that = this;
    this.running = setInterval(function () {
        if (that.snake.body.length === that.map.xGridCount * that.map.yGridCount) {
            clearInterval(that.running);
            alert("good game");
            return;
        }

        if (that.canSnakeEatFood()) {
            that.snakeEatFood();

            that.food.newRandomFood(that.map, that.snake);
            that.food.drawFood();
            that.snake.drawSnake();
            return;
        }

        let preSnakeTail = that.snake.body[that.snake.body.length - 1];
        let successMoved = that.snake.moveOnePoint(that.direction, that.map);
        if (successMoved) {
            that.snake.clearPreSnakeTail(preSnakeTail);
            that.snake.drawNewSnakeHead();
        }
        else {
            clearInterval(that.running);
            alert("game over");
        }
    }, that.timeBetweenTwoPoint);
}

Game.prototype.snakeEatFood = function() {
    this.snake.eatFood(this.food);
}

Game.prototype.canSnakeEatFood = function() {
    if (this.direction === DIRECTION.NORTH) {
        if (this.food.body.x === this.snake.body[0].x && this.food.body.y + 1 === this.snake.body[0].y) {
            return true;
        }
    }
    else if (this.direction === DIRECTION.EAST) {
        if (this.food.body.x - 1 === this.snake.body[0].x && this.food.body.y === this.snake.body[0].y) {
            return true;
        }
    }
    else if (this.direction === DIRECTION.SOUTH) {
        if (this.food.body.x === this.snake.body[0].x && this.food.body.y - 1 === this.snake.body[0].y) {
            return true;
        }
    }
    else if (this.direction === DIRECTION.WAST) {
        if (this.food.body.x + 1 === this.snake.body[0].x && this.food.body.y === this.snake.body[0].y) {
            return true;
        }
    }

    return false;
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.drawPoint = function(color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(this.x * (MAP_LENGTH.GRID_WIdTH + MAP_LENGTH.GRID_GAP_WIdTH), this.y * (MAP_LENGTH.GRID_HEIGHT + MAP_LENGTH.GRID_GAP_HEIGHT), MAP_LENGTH.GRID_WIdTH, MAP_LENGTH.GRID_HEIGHT);
}

Point.prototype.drawGap = function(color, point) {
    canvasContext.fillStyle = color;
    if (this.x === point.x) {
        if (this.y === point.y + 1) {
            canvasContext.fillRect(this.x * (MAP_LENGTH.GRID_WIdTH + MAP_LENGTH.GRID_GAP_WIdTH), this.y * (MAP_LENGTH.GRID_HEIGHT + MAP_LENGTH.GRID_GAP_HEIGHT) - MAP_LENGTH.GRID_GAP_HEIGHT, MAP_LENGTH.GRID_WIdTH, MAP_LENGTH.GRID_GAP_HEIGHT);
        }
        else if (this.y === point.y - 1) {
            canvasContext.fillRect(this.x * (MAP_LENGTH.GRID_WIdTH + MAP_LENGTH.GRID_GAP_WIdTH), this.y * (MAP_LENGTH.GRID_HEIGHT + MAP_LENGTH.GRID_GAP_HEIGHT) + MAP_LENGTH.GRID_HEIGHT, MAP_LENGTH.GRID_WIdTH, MAP_LENGTH.GRID_GAP_HEIGHT);
        }
    }
    else if (this.y === point.y) {
        if (this.x === point.x + 1) {
            canvasContext.fillRect(this.x * (MAP_LENGTH.GRID_WIdTH + MAP_LENGTH.GRID_GAP_WIdTH) - MAP_LENGTH.GRID_GAP_WIdTH, this.y * (MAP_LENGTH.GRID_HEIGHT + MAP_LENGTH.GRID_GAP_HEIGHT), MAP_LENGTH.GRID_GAP_WIdTH, MAP_LENGTH.GRID_HEIGHT);
        }
        else if (this.x === point.x - 1) {
            canvasContext.fillRect(this.x * (MAP_LENGTH.GRID_WIdTH + MAP_LENGTH.GRID_GAP_WIdTH) + MAP_LENGTH.GRID_WIdTH, this.y * (MAP_LENGTH.GRID_HEIGHT + MAP_LENGTH.GRID_GAP_HEIGHT), MAP_LENGTH.GRID_GAP_WIdTH, MAP_LENGTH.GRID_HEIGHT);
        }
    }
}

Point.prototype.equals = function(point) {
    return this.x === point.x && this.y === point.y;
}

Point.prototype.equals = function(point) {
    return this.x === point.x && this.y === point.y;
}

function Map(xGridCount, yGridCount) {
    this.color = COLOR.BLACK;
    this.xGridCount = xGridCount;
    this.yGridCount = yGridCount;
    this.map = new Array(mapSize)
}

Map.prototype.init = function() {
    map = new Array(this.xGridCount);
    for (let i = 0; i < this.xGridCount; i++) {
        map[i] = new Array(this.yGridCount);
        for (let j = 0; j < this.yGridCount; j++) {
            map[i][j] = 0;
        }
    }
}

Map.prototype.drawMap = function() {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(0, 0, this.xGridCount * (MAP_LENGTH.GRID_WIdTH + MAP_LENGTH.GRID_GAP_WIdTH) - MAP_LENGTH.GRID_GAP_WIdTH, this.yGridCount * (MAP_LENGTH.GRID_HEIGHT + MAP_LENGTH.GRID_GAP_HEIGHT) - MAP_LENGTH.GRID_GAP_HEIGHT);
}

function Food() {
    this.color = COLOR.RED;
}

function Food(x, y) {
    this.color = COLOR.RED;
    this.body = new Point(x, y);
}

Food.prototype.init = function() {
    this.body = new Point(5, 2);
}

Food.prototype.drawFood = function() {
    this.body.drawPoint(this.color);
}

Food.prototype.newRandomFood = function(map, snake) {
    while (true) {
        let randomX = Math.floor(Math.random() * map.xGridCount); 
        let randomY = Math.floor(Math.random() * map.yGridCount); 

        let randomPoint = new Point(randomX, randomY);

        if (!this.body.equals(randomPoint) && !snake.containsPoint(randomPoint)) {
            this.body = randomPoint;
            return;
        }
    }
}

function Snake() {
    this.color = COLOR.WHITE;
}

function Snake(body) {
    this.color = COLOR.WHITE
    this.body = body;
}

Snake.prototype.init = function() {
    let body = new Array();
    body.push(new Point(3, 2));
    body.push(new Point(2, 2));
    body.push(new Point(1, 2));
    this.body = body;
}

Snake.prototype.drawSnake = function() {
    for (let i = 0; i < this.body.length - 1; i++) {
        this.body[i].drawPoint(this.color);
        this.body[i].drawGap(this.color, this.body[i + 1]);
    }

    this.body[this.body.length - 1].drawPoint(this.color)
}

Snake.prototype.drawNewSnakeHead = function() {
    this.body[0].drawPoint(this.color);
    this.body[0].drawGap(this.color, this.body[1]);
}

Snake.prototype.clearPreSnakeTail = function(preSnakeTail) {
    preSnakeTail.drawPoint(COLOR.BLACK);
    preSnakeTail.drawGap(COLOR.BLACK, this.body[this.body.length - 1]);
}

Snake.prototype.eatFood = function(food) {
    this.body.splice(0, 0, food.body);
}

Snake.prototype.containsPoint = function(point) {
    for (let i = 0; i < this.body.length; i++) {
        if (this.body[i].equals(point)) {
            return true;
        }
    }

    return false;
}

Snake.prototype.moveOnePoint = function(direction, map) {
    let head = this.body[0];
    let newPoint = null;

    if (direction === DIRECTION.NORTH) {
        if (head.y - 1 < 0) {
            return false;
        }

        newPoint = new Point(head.x, head.y - 1);
    }
    else if (direction === DIRECTION.EAST) {
        if (head.x + 1 >= map.xGridCount) {
            return false;
        }

        newPoint = new Point(head.x + 1, head.y);
    }
    else if (direction === DIRECTION.SOUTH) {
        if (head.y + 1 >= map.yGridCount) {
            return false;
        }

        newPoint = new Point(head.x, head.y + 1);
    }
    else if (direction === DIRECTION.WAST) {
        if (head.x - 1 < 0) {
            return false;
        }

        newPoint = new Point(head.x - 1, head.y);
    }

    if (this.containsPoint(newPoint)) {
        return false;
    }

    this.body.unshift(newPoint);
    this.body.pop();

    return true;
}

var canvas = document.getElementById("canvas");
canvas.height = 200;
canvas.width  = 200;
canvas.style.backgroundColor = COLOR.GREEN;
var canvasContext = canvas.getContext("2d");

var game = new Game(8, DIRECTION.EAST, 200);
game.init();
game.start();

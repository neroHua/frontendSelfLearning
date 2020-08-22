var DIRECTION = {
    WAST : 0,
    WAST_NORTH : 1,
    NORTH : 2,
    EAST_NORTH : 3,
    EAST : 4,
    EAST_SOUTH : 5,
    SOUTH : 6,
    WAST_SOUTH : 7,
    SELF : 8,
}

var FRAME = {
    ZERO: 0,
    ONE : 1,
    TWO : 2,
    THREE : 3,
    FOUR : 4,
    FIVE : 5,
    SIX : 6,
    SEVEN : 7
}

var ONE_IMAGE_INFO = {
    WIDTH : 256,
    HEIGHT : 256,
}

function Person(direction, frame, image, oneImageInfo, distanceBetweenTwoFrame, timeBetweenTwoFrame, x, y) {
    this.direction = direction;
    this.frame = frame;
    this.image = image;
    this.oneImageInfo = oneImageInfo;

    this.distanceBetweenTwoFrame = distanceBetweenTwoFrame;
    this.timeBetweenTwoFrame = timeBetweenTwoFrame;

    this.currentX = x;
    this.currentY = y;
}

Person.prototype.setDirection = function(direction) {
    this.direction = direction;
}

Person.prototype.setFrame = function(frame) {
    this.frame = frame;
}

Person.prototype.setImage = function(image) {
    this.image = image;
}

Person.prototype.setOneImageInfo = function(oneImageInfo) {
    this.oneImageInfo = oneImageInfo;
}

Person.prototype.setDistanceBetweenTwoFrame = function(distanceBetweenTwoFrame ) {
    this.distanceBetweenTwoFrame = distanceBetweenTwoFrame;
}

Person.prototype.setTimeBetweenTwoFrame = function(timeBetweenTwoFrame) {
    this.timeBetweenTwoFrame = timeBetweenTwoFrame;
}

Person.prototype.calculatorDirection = function(targetX, targetY) {
    let diffX = targetX - this.currentX;
    let diffY = targetY - this.currentY;

    let newDirection = DIRECTION.SOUTH;
    if (diffX < 0 && diffY < 0) {
        newDirection = DIRECTION.WAST_NORTH;
    }
    else if (diffX === 0 && diffY < 0) { 
        newDirection = DIRECTION.NORTH;
    }
    else if (diffX > 0 && diffY < 0) { 
        newDirection = DIRECTION.EAST_NORTH;
    }
    else if (diffX > 0 && diffY === 0) { 
        newDirection = DIRECTION.EAST;
    }
    else if (diffX > 0 && diffY > 0) { 
        newDirection = DIRECTION.EAST_SOUTH;
    }
    else if (diffX === 0 && diffY > 0) { 
        newDirection = DIRECTION.SOUTH;
    }
    else if (diffX < 0 && diffY > 0) { 
        newDirection = DIRECTION.WAST_SOUTH;
    }
    else if (diffX < 0 && diffY === 0) { 
        newDirection = DIRECTION.WAST;
    } 
    else if (diffX === 0 && diffY === 0) { 
        newDirection = DIRECTION.SELF;
    } 

    return newDirection;
}

Person.prototype.draw = function(canvasContext) {
    canvasContext.drawImage(this.image, this.frame * this.oneImageInfo.WIDTH, this.direction * this.oneImageInfo.HEIGHT, this.oneImageInfo.WIDTH, this.oneImageInfo.HEIGHT, this.currentX, this.currentY, this.oneImageInfo.WIDTH, this.oneImageInfo.HEIGHT);
}

Person.prototype.clear = function(canvasContext) {
    canvasContext.clearRect(this.currentX, this.currentY, this.oneImageInfo.WIDTH, this.oneImageInfo.HEIGHT);
}

Person.prototype.moveOneFrame = function(canvas, canvasContext, targetX, targetY) {
    let newDirection = this.calculatorDirection(targetX, targetY);

    if (newDirection === DIRECTION.WAST_NORTH) {
        this.currentX -= this.distanceBetweenTwoFrame;
        this.currentY -= this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.NORTH) {
        this.currentY -= this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.EAST_NORTH) {
        this.currentX += this.distanceBetweenTwoFrame;
        this.currentY -= this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.EAST) {
        this.currentX += this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.EAST_SOUTH) {
        this.currentX += this.distanceBetweenTwoFrame;
        this.currentY += this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.SOUTH) {
        this.currentY += this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.WAST_SOUTH) {
        this.currentX -= this.distanceBetweenTwoFrame;
        this.currentY += this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.WAST) {
        this.currentX -= this.distanceBetweenTwoFrame;
    }
    else if (newDirection === DIRECTION.SELF) {
        console.log("self");
        clearInterval(this.running);
        return;
    }

    this.clear(canvasContext);
    console.log("clear" + "---" + this.currentX + "---" + this.currentY + "---" + targetX + "---" + targetY + "---" + this.direction);

    this.frame = this.frame + 1 === 8 ? 0 : this.frame + 1;
    this.setDirection(newDirection);

    this.currentX = this.currentX < 0 ? 0 : this.currentX;
    this.currentX = this.currentX > canvas.width ? canvas.width : this.currentX;

    this.currentY = this.currentY < 0 ? 0 : this.currentY;
    this.currentY = this.currentY > canvas.height ? canvas.height : this.currentY;

    this.draw(canvasContext);
    console.log("DrawD" + "---" + this.currentX + "---" + this.currentY + "---" + targetX + "---" + targetY + "---" + this.direction);
}

Person.prototype.moving = function(canvas, canvasContext, targetX, targetY) {
    let that = this;
    if (this.running !== undefined) {
        clearInterval(this.running);
    }
    this.running = setInterval(function() {
        that.moveOneFrame(canvas, canvasContext, targetX, targetY);
    }, that.timeBetweenTwoFrame);
}

function main () {
    var canvas = document.getElementById("canvas");
    var canvasContext = canvas.getContext("2d");

    personImage = new Image();
    personImage.src = "../01PersonWalk2D/img/personWalk.png";
    var person = new Person(DIRECTION.WAST, FRAME.ZERO, personImage, ONE_IMAGE_INFO, 1, 50, 300, 300);

    personImage.onload = function() {
        person.draw(canvasContext);
    }

    canvas.addEventListener("click", function(event) {
        person.moving(canvas, canvasContext, event.pageX - ONE_IMAGE_INFO.WIDTH / 2, event.pageY - ONE_IMAGE_INFO.HEIGHT / 2);
    });
}

main();
const WIDTH = 600;
const HEIGHT = 400;
var charData = [[50, 10], [100, 50], [150, 200], [200, 300], [250, 350], [300, 150], [350, 150], [400, 100]];

var canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

var canvasContext = canvas.getContext("2d");

drawLine(0, HEIGHT, WIDTH, HEIGHT);
drawLine(0, HEIGHT, 0, 0);

for (let i = 0; i < charData.length; i++) {
    drawCircular(charData[i][0], HEIGHT - charData[i][1]);
    drawMarkerText(charData[i][1], charData[i][0], HEIGHT - charData[i][1]);
}

for (let i = 0; i < charData.length - 1; i++) {
    drawCircular(charData[i][0], HEIGHT - charData[i][1]);
    drawLine(charData[i][0], HEIGHT - charData[i][1], charData[i + 1][0], HEIGHT - charData[i + 1][1]);
}

for (let i = 0; i < charData.length; i++) {
    canvasContext.textAlign = "center"
    drawMarkerText(charData[i][0], charData[i][0], HEIGHT);
}

for (let i = 0; i < charData.length; i += 50) {
    canvasContext.textAlign = "center"
    drawMarkerText(i , 0, HEIGHT - i);
}

function drawLine(x1, y1, x2, y2) {
    canvasContext.beginPath();
    canvasContext.moveTo(x1, y1);
    canvasContext.lineTo(x2, y2);
    canvasContext.stroke();
    canvasContext.closePath();
}

function drawCircular(x, y){
    canvasContext.beginPath();
    canvasContext.arc(x, y, 3, 0, 2 * Math.PI);
    canvasContext.fillStyle = "red";
    canvasContext.fill();
    canvasContext.closePath();
}

function drawMarkerText(markerText, x, y) {
    canvasContext.fillText(markerText, x, y);
}
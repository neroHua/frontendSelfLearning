
window.onload = function() {
    alert("onload event");
}

window.onclose = function() {
    alert("onclose event");
}

var div01 = document.getElementById("div01");

div01.onmouseover = function() {
    this.style.backgroundColor = "red";
}

div01.onmouseenter = function() {
    alert("onmouseenter event");
}

div01.onmouseleave= function() {
    alert("onmouseleave event");
}

div01.onmouseleave= function() {
    alert("onmouseleave event");
}

div01.onclick = function() {
    alert("onclick event");
}

document.onkeydown = function(event) {
    alert("onkeydown" + event.keyCode);
}

document.onkeypress = function(event) {
    alert("onkeypress" + event.keyCode);
}
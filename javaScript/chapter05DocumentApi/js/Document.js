var div01 = document.getElementById("div01");
alert(div01);

var div02 = document.getElementsByTagName("body");
alert(div02 + div02.length);

var div03 = document.getElementsByClassName("class00");
alert(div03 + div03.length);

var lastChild = div02[0].lastChild;
alert(lastChild);

var firstChild = div02[0].firstChild.nextSibling;
alert(div02[0].innerHTML)
var firstChildIdAttribute = firstChild.getAttribute("id");
alert(firstChildIdAttribute);

var nextChild = firstChild.firstChild.nextSibling;
nextChild.setAttribute("class", "class01");

var img = document.createElement("img");

img.setAttribute("src", "img/img1.jpg")
nextChild.appendChild(img);

nextChild.style.backgroundColor = "blue";
alert(nextChild.style.backgroundColor);
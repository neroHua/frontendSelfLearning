function test00() {
}

function test01(a) {
}

function test03() {
    return 1;
}

function test04(a) {
    return a;
}

function test05(a, b) {
    return a + b;
}

var a0 = test00();
var a1 = test01(1);
var a3 = test03();
var a4 = test04(2);
var a5 = test05(1, 2);

document.write(a0 + typeof(a0) + "<br/>");
document.write(a1 + typeof(a1) + "<br/>");
document.write(a3 + typeof(a3) + "<br/>");
document.write(a4 + typeof(a4) + "<br/>");
document.write(a5 + typeof(a5) + "<br/>");

var b0 = function() {

}

var b1 = function(a) {

}

var b3 = function() {
    return 1;
}

var b4 = function(a) {
    return a;
}

var b5 = function(a, b) {
    return a + b;
}

document.write("<br/>");
document.write(b0 + typeof(b0) + "<br/>");
document.write(b1 + typeof(b1) + "<br/>");
document.write(b3 + typeof(b3) + "<br/>");
document.write(b4 + typeof(b4) + "<br/>");
document.write(b5 + typeof(b5) + "<br/>");

var c0 = b0();
var c1 = b1(1);
var c3 = b3();
var c4 = b4(1);
var c5 = b5(1, 2);

document.write("<br/>");
document.write(c0 + typeof(c0) + "<br/>");
document.write(c1 + typeof(c1) + "<br/>");
document.write(c3 + typeof(c3) + "<br/>");
document.write(c4 + typeof(c4) + "<br/>");
document.write(c5 + typeof(c5) + "<br/>");

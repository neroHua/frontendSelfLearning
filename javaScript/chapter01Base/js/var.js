var a;

var b = null;

var c1 = 1;
var c2 = 1.1;

var d1 = 'a';
var d2 = 'aaaa';
var d3 = "a";
var d4 = "aaaa";

var e1 = true;
var e2 = false;

var f1 = {};

var g2 = [1, 2, 3]
var g3 = new Array(1, 2, 3);
var g4 = new Array(3);
g4[0] = 1;
g4[1] = 2;
g4[2] = 3;

var g5 = [[1, 2], [1, 2]]
var g6 = new Array(g3, g3);
var g7 = new Array();
for(var i = 0;i < 2; i++){
    g7[i] = new Array(); 
    for(var j = 0; j < 2; j++){
        g7[i][j] = j + 1;
    }
}

document.write(a + typeof(a) + "<br/>")
document.write(a + typeof(b) + "<br/>")

document.write(c1 + typeof(c1) + "<br/>")
document.write(c2 + typeof(c2) + "<br/>")

document.write(d1 + typeof(d1) + "<br/>")
document.write(d2 + typeof(d2) + "<br/>")
document.write(d3 + typeof(d3) + "<br/>")
document.write(d4 + typeof(d4) + "<br/>")

document.write(e1 + typeof(e1) + "<br/>")
document.write(e2 + typeof(e2) + "<br/>")

document.write(f1 + typeof(f1) + "<br/>")

document.write(g2 + typeof(g2) + g2[0] + g2[1] + g2[2] + "<br/>")
document.write(g3 + typeof(g3) + g3[0] + g3[1] + g3[2] + "<br/>")
document.write(g4 + typeof(g4) + g4[0] + g4[1] + g4[2] + "<br/>")

document.write(g5 + typeof(g5) + g5[0][0] + g5[0][1] + g5[1][0] + g5[1][1] + "<br/>")
document.write(g6 + typeof(g6) + g6[0][0] + g6[0][1] + g6[1][0] + g6[1][1] + "<br/>")
document.write(g7 + typeof(g7) + g7[0][0] + g7[0][1] + g7[1][0] + g7[1][1] + "<br/>")
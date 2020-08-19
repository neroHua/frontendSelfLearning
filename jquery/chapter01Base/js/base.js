$("#div01").css({"background" : "orange"});
$(".child").css({"border" : "10px dashed green"});

var $div1 = $("#div01");
var div1 = $div1[0];
alert($div1);
alert(div1);

var div2 = document.getElementById("div01");
var $div2 = $(div2);
alert($div2);
alert(div2);
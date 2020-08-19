// style
$("#li01").addClass("odd");
alert("add class");
var has = $("#li01").hasClass("odd");
alert("has class" + has);

$("#li01").removeClass("odd");
alert("remove class");

$("#li01").css({"background" : "green", "border" : "10px dashed black"});
alert("update css");


// innerHtml
$("#li01").html("<p>aaaa</p>");
// $("#li01").text("bbb");

// document
var nameValue = $("#name01").val();
alert("nameValue" + nameValue);

var $li = $("<li></li>");
$li.attr({"id" : "li02", "class" : "odd"});

alert($li.attr("id") + $li.attr("odd"));
$("#li01").before($li);

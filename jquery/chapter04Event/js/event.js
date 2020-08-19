
$(document).ready(function() {
    alert("onload event");
});

// $(window).unload(function() {
//     alert("onclose event");
// });

var $div01 = $("#div01");

$div01.mouseover(function() {
    $(this).css({"backgroundColor" : "red"});
});

$div01.mouseenter(function() {
    alert("onmouseenter event");
});

$div01.mouseleave(function() {
    alert("onmouseleave event");
});

$div01.mouseleave(function() {
    alert("onmouseleave event");
});

$div01.click(function() {
    alert("onclick event");
});

$(document).keydown(function(event) {
    alert("onkeydown" + event.keyCode);
});

$(document).keypress(function(event) {
    alert("onkeypress" + event.keyCode);
});
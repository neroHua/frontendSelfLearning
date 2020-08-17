window.location;

document.write(window.location + "<br/>");
document.write(window.history + "<br/>");
document.write(window.screen + "<br/>");

alert("alertTest");
console.log("logTest");

var a = prompt("输入喜欢的颜色", "红色");
alert(a);
console.log(a);

var b = confirm("确定选择是吗？");
alert(b);
console.log(b);

window.open("https://www.baidu.com");
// window.close();

var timeout4s = function() {
    alert("4s触发此函数");
}
setTimeout(timeout4s, 2000);

var timeinterval3s = function() {
    document.write("3s循环触发此函数<br/>");
    var date = new Date();
    document.write(date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate()+ "日" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "<br/>")
    var random = Math.round(Math.random() * 10 + 1);
    document.write(random + "<br/>")
}
setInterval(timeinterval3s, 3000);



function navigation(e) {//实现跳转，e为默认事件
    console.log(e.target.innerHTML);
    if(e.target.innerText == "灯控") {
        window.location.href = "light.html";//跳转到light.html
    }
}
var buttons = document.getElementsByClassName("control_button");//获取所有"control_button"的元素
console.log(buttons);
new ButtonAddEventListener(buttons, navigation).main();
function navigation(e) {
    console.log(e.target.innerHTML);
    if(e.target.innerText == "灯控") {
        window.location.href = "light.html";
    }
}
var buttons = document.getElementsByClassName("control_button");
console.log(buttons);
new ButtonAddEventListener(buttons, navigation).main();
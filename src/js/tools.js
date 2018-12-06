



// 调整button功能
/**
 *
 * @param buttonsClass  传入一组按钮
 * @param functionEvent  监听函数
 * @constructor
 */
function ButtonAddEventListener(buttonsClass, functionEvent) {
    this.myinit = function() {
        this.buttons = buttonsClass;
    }

    this.buttonAddListener = function() {
        for (var i = 0; i < this.buttons.length; i++) {
            buttons[i].addEventListener("click", functionEvent);
        }
    }

    this.main = function() {
        this.myinit();
        this.buttonAddListener();
    }
    this.main();
}


function getStyle(obj, styleString, pseudoElt) {
    return document.defaultView.getComputedStyle(obj, pseudoElt).getPropertyValue(styleString);
}


var mid = document.getElementById("mid");
var inner = document.getElementById("inner");

function setMiddle_Height() {
    var outerClientWidth = document.documentElement.clientWidth;
    // var outerClientHeight = document.documentElement.clientHeight;

    // var new_H = outerClientHeight * 0.9;
    // mid.style.height = new_H + "px";

    var new_W = outerClientWidth * 0.7;
    mid.style.width = new_W + "px";

}
setMiddle_Height();


function adjustMobile() {
    var cH = document.documentElement.clientHeight || document.body.clientHeight;
    var cW = document.documentElement.clientWidth || document.body.clientWidth;


    if (cW < cH) {
        mid.style.width = cW*0.9 + "px";
        mid.style.height = cH*0.8 + "px";
        inner.style.height = "100%";
        inner.style.padding = "0px 0px";
        inner.style.flexDirection = "column";

        var mydiv = document.getElementById("inner").getElementsByTagName("div");
        for (var i = 0; i < mydiv.length; i++) {
            mydiv[i].style.height = cH * 0.19 + "px";
            mydiv[i].style.fontSize= "2.4em";
        }

    } else {
        setMiddle_Height();
    }
}



adjustMobile();
window.onresize = function (ev) {
    adjustMobile();
}





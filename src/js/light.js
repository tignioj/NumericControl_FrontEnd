function adjustSpans() {
    var spans = document.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++) {
        var h = getStyle(spans[i], "height");
        spans[i].style.lineHeight = h;
    }
}
adjustSpans();
function adjustLabel() {
    var label = document.getElementsByTagName("label")[0];
    var h = getStyle(label, "height");
    label.style.lineHeight = h;
}
adjustLabel();



var uploadWindow = document.getElementsByClassName("upload_window")[0];
var buttons = document.getElementsByClassName("led_control");

function checkFileName(f) {
    if(f == undefined) {
        return;
    }
    var subname = f.name.substr(f.name.length-5, 5);
    var patt1 = new RegExp("\.mp3|\.wav|\.wave|\.vqf|\.ogg|\.wma|\.aac|\.mpeg-4|\.mpeg|\.midi|\.amr|\.ape|\.cd|\.aiff|\.flac", "i");
    // var patt1 = new RegExp("\.sql|\.zip|\.rar", "i");
    console.log(subname + patt1.test(subname));
    if(!patt1.test(subname)) {
        alert("非音频文件，请重新上传!");
        return false;
    }
    return true;
}


function uploadAudioNow() {
    var filesElem = document.getElementById("file");
    if (filesElem.files.length <= 0) {
        document.getElementsByTagName("label")[0].click();
        return;
    }
    var xhr = new XMLHttpRequest();
    //接收上传文件的后台地址
    var fileController = "./back/test.php";

    var fileObj= filesElem.files[0]; //获取文件对象
    //可以增加表单数据
    var form = new FormData();

    console.log(form);

    if(!checkFileName(fileObj)) {
        return;
    }

    //文件对象
    form.append("up_file", fileObj);  // 这里的名字up_file要和后台对应
    xhr.open("post", fileController, true)
    xhr.onload = function () {
        alert("上传状态:" + xhr.responseText);
    };

    xhr.send(form);
}

function getFileName(f) {
    var name = f.name;
    var size = f.size/1024;
    if(f.name.length >= 10) {
        name = f.name.substr(0, 8) + "...";
    }

    var filestr =name + " 大小:" + size.toFixed(1)  + " KB";
    if(size > 1024) {
        size = size/1024;
        filestr = name + " 大小:" + size.toFixed(1) + " MB";
    }
    return filestr;
}

function loadFile(f) {
    if(!checkFileName(f)){
        return;
    }
    var filestr = getFileName(f);
    console.log(filestr);
    uploadWindow.getElementsByTagName("a")[0].innerHTML = filestr;
    console.log(uploadWindow.innerHTML);
}

/**
 * @param way GET或者POST
 * @param location  传输地址
 * @param content  传输的内容
 */
function ajax(way, location, content) {
    var xhr = new XMLHttpRequest();
    xhr.open(way, location + "?data=" + content);
    xhr.send();
}

function buttonSwitch(evt) {
    var location = "back/test.php";
    var spanNode = evt.target.parentElement.firstChild.nextSibling;
    var thisNode = evt.target;


    function tellBackON() {
        var mydata = spanNode.innerText + "on";
        ajax("get", location, mydata);
    }
    function tellBackOFF() {
        var mydata = spanNode.innerText + "off";
        ajax("get", location, mydata);
    }

    // 点击的按钮是否为总开关
    function mainSwitch() {
        if(spanNode.innerText== "MainSwitch") {
            // 如果是开
            if (thisNode.innerText == "ON") {
                for (var i = 2; i < buttons.length; i++) {
                    if(buttons[i].innerText == "OFF") {
                        buttons[i].click();
                    }
                }
            }
            else {
                for (var i = 2; i < buttons.length; i++) {
                    if(buttons[i].innerText == "ON") {
                        buttons[i].click();
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    function main() {
        // 不是总开关，则处理其它按钮
        if(!mainSwitch()){
            if (thisNode.innerText == "ON") {
                thisNode.innerHTML = "OFF";
                tellBackOFF();
            } else if (thisNode.innerText == "OFF"){
                thisNode.innerHTML = "ON";
                tellBackON();
            }
        }
    }
    main();
}

new ButtonAddEventListener(buttons, buttonSwitch);


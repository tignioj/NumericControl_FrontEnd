// 调整标签==========
function adjustSpans() {
    var spans = document.getElementsByTagName("span");
    for (var i = 0; i < spans.length; i++) {
        var h = getStyle(spans[i], "height");
        spans[i].style.lineHeight = h;
    }
}
// adjustSpans();

function adjustLabel() {
    var label = document.getElementById("upload_window");
    var h = getStyle(label, "height");
    label.style.lineHeight = h;
}
// adjustLabel();

//----------------
var uploadWindow = document.getElementById("upload_window");  // 音频的label标签
var buttons = document.getElementsByClassName("led_control");
var uploadButton = document.getElementById("upload_button");
var file = document.getElementById("file");
var chooseFileButton = document.getElementById("choose_file_button");
chooseFileButton.addEventListener("click", function (ev) {
    file.click();
});

uploadButton.addEventListener("click", prepareUpload);

function prepareUpload() {
    var filesElem = document.getElementById("file");
    if (filesElem.files.length <= 0) {
        chooseFileButton.click();
        return;
    }
    var fileObj = filesElem.files[0];

    if (!checkFileName(fileObj)) {
        return;
    }
    uploadAudioNow(fileObj);
}


// 检查音频文件名称
function checkFileName(f) {
    if (f == undefined) {
        return;
    }
    // var patt1 = new RegExp("\.mp3|\.wav", "i");
    var patt1 = new RegExp("\.wav", "i");
    if (!patt1.test(f.name)) {
        alert("仅支持wav!");
        return false;
    }
    return true;
}


// 将音频文件上传到php
function uploadAudioNow(blob) {
    uploadButton.innerHTML = "上传中..";
    uploadButton.disabled = true;

    var xhr = new XMLHttpRequest();
    //接收上传文件的后台地址

    var fileController = "./back/saveAudio.php";

    var fileObj = blob; //获取文件对象

    //可以增加表单数据
    var form = new FormData();

    //文件对象
    console.log(window.test);
    form.append("up_file", fileObj, "audio.wav"); // 这里的名字up_file要和后台对应
    xhr.open("post", fileController, true)
    xhr.onload = function() {
        console.log("上传状态:" + xhr.responseText);
    };

    xhr.upload.addEventListener('progress', updateProgress);
    function updateProgress(event) {
        var percent = event.loaded / event.total;
        // console.log(percent.toFixed(1));
        if(percent >= 1) {
            uploadButton.innerHTML = "上传成功";
            uploadButton.disabled = false;
            uploadWindow.innerHTML = "点击录音";
        }
    }
    xhr.send(form);
}

// 音频文件名称
function getFileName(f) {
    var name = f.name;
    var size = f.size / 1024;
    if (f.name.length >= 10) {
        name = f.name.substr(0, 8) + "...";
    }

    var filestr = name + " 大小:" + size.toFixed(1) + " KB";
    if (size > 1024) {
        size = size / 1024;
        filestr = name + " 大小:" + size.toFixed(1) + " MB";
    }
    return filestr;
}

// 加载音频文件名称到按钮
function loadFileName(f) {
    console.log(f);
    if (!checkFileName(f)) {
        return;
    }
    var filestr = getFileName(f);
    uploadWindow.innerHTML = filestr;
    uploadButton.innerHTML = "点击上传";
}

/**
 * @param way GET或者POST
 * @param location  传输地址
 * @param content  传输的内容
 */

function buttonSwitch(evt) {
    var location = "back/test.php";
    var spanNode = evt.target.parentElement.firstChild.nextSibling;
    var thisNode = evt.target;


    // 告诉后台的信息" 灯名 + 开1/关0"
    function tellBackON() {
        var mydata = spanNode.innerText + "1";

        var xhr = new XMLHttpRequest();
        xhr.open("get", location + "?data=" + mydata);
        xhr.send();

    }

    function tellBackOFF() {
        var mydata = spanNode.innerText + "0";

        var xhr = new XMLHttpRequest();
        xhr.open("get", location + "?data=" + mydata);
        xhr.send();
    }

    // 点击的按钮是否为总开关
    function mainSwitch() {
        if (spanNode.innerText == "MainSwitch") {
            // 如果是开
            if (thisNode.innerText == "ON") {
                for (var i = 2; i < buttons.length; i++) {
                    if (buttons[i].innerText == "OFF") {
                        buttons[i].click();
                    }
                }
            } else {
                for (var i = 2; i < buttons.length; i++) {
                    if (buttons[i].innerText == "ON") {
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
        if (!mainSwitch()) {
            if (thisNode.innerText == "ON") {
                thisNode.innerHTML = "OFF";
                tellBackOFF();
            } else if (thisNode.innerText == "OFF") {
                thisNode.innerHTML = "ON";
                tellBackON();
            }
        }
    }
    main();
}
        function updateAllLED() {
            for (var i = 2; i < buttons.length; i++) {
                var thisNode = buttons[i];
                var spanNode = thisNode.parentElement.firstChild.nextSibling;
                var ledName = spanNode.innerText;

                var xhr = new XMLHttpRequest();
                xhr.open("get", "back/" + ledName + ".txt", false);
                xhr.send();
                var data = parseInt(xhr.responseText);
                if (data == 1) {
                    thisNode.innerHTML = "ON";
                } else {
                    thisNode.innerHTML = "OFF";
                }
            }
        }

        updateAllLED();


new ButtonAddEventListener(buttons, buttonSwitch);

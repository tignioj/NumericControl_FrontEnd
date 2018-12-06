<?php
    header('Access-Control-Allow-Origin:*');
    // $data = $_GET["data"];
    // echo "hello".$data;
    $filepath = '../tempfile/';
    if(!empty($_FILES['up_file']['name'])){       //判断是否有文件
        $fileinfo = $_FILES['up_file'];      //将文件信息赋给变量$fileinfo
        if(move_uploaded_file($fileinfo['tmp_name'], $filepath.$fileinfo['name'])) {
            echo "success";
        } else {
            echo "fail";
        }
    } else {
        echo "no file";
    }
?>
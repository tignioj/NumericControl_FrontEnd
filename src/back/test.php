<?php
    $data = $_GET["data"];
    echo $data;
    $data1 = substr($data,0,4);
    $data2 = substr($data,4);
    $myfile = fopen("$data1.txt", "w");
    fwrite($myfile,$data2);
?>


<?php
/**
 * Created by IntelliJ IDEA.
 * User: lili
 * Date: 12/1/2018
 * Time: 1:07 PM
 */

$myfile = fopen("filetest.txt", "r") or die("No such file");
echo fread($myfile, filesize("filestest.txt"));
fclose($myfile);
?>
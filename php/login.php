<?php
    header('content-type:text/html;charset="utf-8"');


    //取出传过来的数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    // echo ($_POST);
    $link = mysql_connect('localhost','root','123456');

    if(!$link){
        echo "服务器正忙，请稍后重试",
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db('user');

    $sql = "SELECT * FROM users where username = '{$username}' AND password = '${password}'";

    $res = mysql_query($sql);

    $row = mysql_fetch_assoc($res);

    if($row){
        echo "登录成功";
    }else{
        echo"登录失败";
    }

    mysql_close($link);


?>
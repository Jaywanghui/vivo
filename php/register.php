<?php
    header('content-type:text/html;charset="utf-8"');


    //取出传过来的数据
    $username = $_POST["username"];
    $password = $_POST["password"];
    $addtime = $_POST["addtime"];
    // echo ($_POST);
    $link = mysql_connect('localhost','root','123456');

    if(!$link){
        echo "服务器正忙，请稍后重试",
        exit;
    }

    mysql_set_charset("utf8");

    mysql_select_db('user');

    // $sql = "SELECT * COUNT(*) AS count"
    // $res = mysql_query($sql);
    $sql1 = "SELECT * FROM users where username = '{$username}'";
    

    $res1 = mysql_query($sql1);

    $row = mysql_fetch_assoc($res1);
    // echo "$row";


    if($row){
        echo"手机号已被注册过";
        exit;
    }

    $sql2 = "INSERT INTO users(username,password,addtime) VALUE ('{$username}','{$password}',{$addtime})";
    $res2 = mysql_query($sql2);

    if(!$res2){
        echo"注册失败";
    }else{
        echo"注册成功";
    }
    

    mysql_close($link);


?>
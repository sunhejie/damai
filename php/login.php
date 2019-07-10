<?php
include "conn.php";
if(isset($_POST['user']) && isset($_POST['pass'])){
    $user=$_POST['user'];
    $pass=sha1($_POST['pass']);

    $result=$conn->query("select * from users where uname='$user' and upassword='$pass' ");

    if($result->fetch_assoc()){//登录成功
        echo true;
    }else{//登录失败
        echo false;
    }

}
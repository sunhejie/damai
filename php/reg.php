<?php
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
if(isset($_POST['name'])){
    $name=$_POST['name']; 
    $result=$conn->query("select * from user where tel='$name'");
    if($result->fetch_assoc()){
        echo '{"msg":true,"s":"用户名存在"}';
    }else{
        echo '{"msg":false,"s":"用户名可以使用"}';
    }
}

if(isset($_POST['username'])){
    $username=$_POST['username'];
    $password=sha1($_POST['password']);
    $conn->query("insert user values(null,'$username','$password',NOW())");
    header('location:http://10.31.158.15/damai/src/login.html');
   
}

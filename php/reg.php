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



if(isset($_POST['submit'])){
    $username=$_POST['username'];
    $password=sha1($_POST['password']);
    echo $username;
    $query="insert user(sid,tel,password,regdate) values(null,'$user','$pass',NOW())";
    mysql_query($query);
    
    header('http://10.31.158.15/damai/src/registor.html');
}

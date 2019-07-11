<?php
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Method:POST,GET');
require "conn.php";	
if(isset($_POST['username'])&& isset($_POST['password'])){
	$username=$_POST['username'];
	$password=($_POST['password']);
}else{
	exit('非法操作');
}

$result=$conn->query("select * from user where tel='$username' and password='$password'");

if($result->fetch_assoc()){//登录成功
    echo '1';
    }else{
        echo '0';
    }






	
	

<?php
header('Access-Control-Allow-Origin:*'); 
header('Access-Control-Allow-Method:POST,GET');

include "conn.php";

if(isset($_GET['pid'])){//目标商品id通过ajax发送过来
    $id=$_GET['pid']; 
    $result=$conn->query("select * from taobaopic where sid='$id'");
   
    echo json_encode($result->fetch_assoc()) ;//返回目标商品信息
};
"use strict";var $submit=$("#sub"),$uname=$("#fm-login-id"),$password=$("#fm-login-password"),$errorinfo=$("#errorinfo");$submit.on("click",function(){$.ajax({type:"post",url:"http://10.31.158.15/damai/php/login.php",data:{username:$uname.val(),password:$password.val()}}).done(function(a){1==a?($(window).attr("location","http://localhost/damai/src/ind.html"),$.session.set("successname",$uname.value)):(alert("用户名或者密码错误"),$password.val(""))})});
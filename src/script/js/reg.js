! function() {
    let $username = $('#user');
    let $pass = $('#pass');
    let $passsure = $('#passsure');
    let $errorinfo = $('#tel'); //电话报错框
    let $errorpas = $('#pas'); //密码报错框
    let $errorsure = $('#sure'); //密码一致报错框
    let $submit = $('#btn');
    //console.log($submit)
    let usernameflag = true; //检测用户名是否重复的标记，阻止提交。
    let passflag = true; //是否一致
    let maflag = true; //密码格式


    //失去焦点将手机号传给后端。
    $username.on('blur', function() {
            if ($username.val() != '') {
                let pattern = /^1[34578]\d{9}$/;
                //console.log(pattern.test($username.val()))
                if (pattern.test($username.val())) {
                    $.ajax({
                        type: "post",
                        url: "http://10.31.158.15/damai/php/reg.php",
                        data: {
                            name: $username.val()
                        },
                        dataType: "json",

                    }).done(function(data) {
                        // console.log(data)
                        if (data.msg) {
                            $errorinfo.html(data.s)
                            usernameflag = true;

                        } else {
                            $errorinfo.html(data.s)
                            usernameflag = false
                        }
                    });

                } else {
                    $errorinfo.html('手机号格式不对')
                    usernameflag = false
                }
            } else {
                $errorinfo.html('手机号不能为空')
                usernameflag = false
            }




        })
        //失去焦点判断密码格式
    $pass.on('blur', function() {
            if ($pass.val() != '') {
                var $reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                if ($reg.test($pass.val())) {
                    $errorpas.html('密码可用')
                    maflag = true
                } else {
                    $errorpas.html('长度(8~16)，包含字母和数字')
                    maflag = false
                }
            } else {
                $errorpas.html('密码不能为空')
                maflag = false
            }
        })
        //密码是否一致
    $passsure.on('blur', function() {
        if ($pass.val() == $passsure.val() && $pass.val() != '') {
            $errorsure.html('√')
            passflag = true
        } else {
            $errorsure.html('密码不一致');
            passflag = false
        }
    })



    //2.点击提交注册按钮将数据提交到数据库
    $submit.on('click', function() {
        // if (!usernameflag || !passflag || !maflag) {
        //     $username.focus(); //input获得焦点
        //     return false;
        //}
    })

}()
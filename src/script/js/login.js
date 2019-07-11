//取元素
const $submit = $('#sub');
const $uname = $('#fm-login-id');
const $password = $('#fm-login-password');
const $errorinfo = $('#errorinfo');
$submit.on('click', function() {

    $.ajax({
        type: 'post',
        url: "http://10.31.158.15/damai/php/login.php",
        data: {
            username: $uname.val(),
            password: $password.val()
        }
    }).done(function(d) {
        if (d == 1) {

            $(window).attr('location', 'http://localhost/damai/src/ind.html');
            $.session.set('successname', $uname.value)
        } else {

            alert('用户名或者密码错误');
            $password.val('');

        }


    });
})
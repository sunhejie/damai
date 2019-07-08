! function() {
    const $fixbox = $('.notice-nav-fixed');
    const $item = $('.notice-nav-item');
    $(window).on('scroll', function() {
        let $scrollT = $(window).scrollTop();
        if ($scrollT > 600) {
            $fixbox.show();
        } else {
            $fixbox.hide()
        }
    });
}();

! function() {
    const $loutinav = $('#loutinav');
    const $loutili = $('#loutinav li');
    const $louceng = $('.dm-content');
    const $last = $('.last');
    $(window).on('scroll', function() {
        let $scrolltop = $(window).scrollTop();
        if ($scrolltop >= 410) {
            $loutinav.show();
        } else {
            $loutinav.hide();
        }
        //触发滚动条事件
        $louceng.each(function(index, element) { //遍历楼层
            //console.log($louceng.eq(index).offset().top); //获取每层的top
            let $loucengtop = $louceng.eq(index).offset().top + $(element).height() / 2;
            if ($loucengtop >= $scrolltop) {
                $('#loutinav li').not('.last').removeClass('active');
                $('#loutinav li').not('.last').eq(index).addClass('active');
                return false;
            }
        });
        //点击楼梯，跳转。
        $loutili.not('.last').on('click', function() {

            $(this).addClass('active').siblings().removeClass('active');
            let $loucenttop = $louceng.eq($(this).index()).offset().top;

            $('html,body').animate({
                scrollTop: $loucenttop
            });

        });

        //返回顶部
        $last.on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            });
        });


    });
}();
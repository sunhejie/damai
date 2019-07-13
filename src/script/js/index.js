//懒加载
$(function() { //和拼接的元素放在一起。
    $(".itemimg img").lazyload({
        effect: "fadeIn" //图片显示方式
    });
});
//渲染
! function() {

    let $boxright = $('#box-right');
    $.ajax({
        url: 'http://10.31.158.15/damai/php/damaidata.php',
        dataType: 'json'
    }).done(function(data) {
        // console.log(data);
        var $boxcontent = '';

        $.each(data, function(index, value) {
            $boxcontent += `
                            
                        <a href="details.html?id=${value.sid}" class="box-right__item" data-spm="ditem_1" target="_blank">
                            <div class="itemimg">
                                <img src="${value.url}" class="lazy">
                            </div>
                            <div class="iteminfo">
                                <div class="title" title=${value.titile}>${value.titile}</div>
                                <div class="venue">${value.dizhi}</div>
                                <div class="showtime">2019.07.28 周日 19:30</div>
                                <div class="price">${value.price}<span>起</span></div>
                            </div>
                        </a>				
                        `;
        });
        $boxright.html($boxcontent);
    });
}();

//楼梯
;
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
        $louceng.each(function(index, element) {
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


//轮播
! function() {
    const $banner = $('.banner');
    const $pics = $('.tab-pannel');
    const $prev = $('.prev');
    const $next = $('.next');
    let $dot = $('.dot');

    let $num = 0;
    let timer = null;

    $dot.on('click', function() { //圆点切换
        let $num = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $pics.eq($num).css({ "z-index": "1", "opacity": "1" }).siblings().css({ "z-index": "0", "opacity": "0" })
    });

    $next.on('click', function() {
        $num++;
        if ($num > $pics.length - 1) {
            $num = 0;
            $dot.eq($num).addClass('current').siblings().removeClass('current');
            $pics.eq($num).css({ "z-index": "1", "opacity": "1" }).siblings().css({ "z-index": "0", "opacity": "0" })
        } else {
            $dot.eq($num).addClass('current').siblings().removeClass('current');
            $pics.eq($num).css({ "z-index": "1", "opacity": "1" }).siblings().css({ "z-index": "0", "opacity": "0" })
        }

    });

    $prev.on('click', function() {
        $num--;
        if ($num < 0) {
            $num = $pics.length - 1;
            $dot.eq($num).addClass('current').siblings().removeClass('current');
            $pics.eq($num).css({ "z-index": "1", "opacity": "1", "transition": "all 0.5s" }).siblings().css({ "z-index": "0", "opacity": "0" })
        } else {
            $dot.eq($num).addClass('current').siblings().removeClass('current');
            $pics.eq($num).css({ "z-index": "1", "opacity": "1", "transition": "all 0.5s" }).siblings().css({ "z-index": "0", "opacity": "0", })
        }

    });

    timer = setInterval(() => {
        $next.click();
    }, 2000);

    $banner.hover(function() {
        clearInterval(timer)
    }, function() {
        timer = setInterval(() => {
            $next.click();
        }, 2000);
    });
}()
// tab切换
! function() {

    $('#tab .tab_title li').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('#tab .tab_content .item').eq($(this).index()).addClass('show123').siblings().removeClass('show123');
    })

}();

// 二级效果 “全国”
;
! function() {
    const $guo = $(' .location-header');
    const $city = $('.city-header-wrap');
    $guo.hover(function() { $city.show() }, function() { $city.hide() })

}();
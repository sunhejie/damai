! function() {
    ! function() {
        //详情页-tab切换
        const $fixbox = $('.notice-nav-fixed');
        const $item = $('.notice-nav-item');
        const $boxceng = $('.notice-content #detail');
        let $scrollT = $(window).scrollTop();
        $(window).on('scroll', function() {
            let $scrollT = $(window).scrollTop();
            // $('title').html($scrollT)
            if ($scrollT > 600) {
                $fixbox.show();
                $('.notice-nav-item-flag').show();
            } else {
                $fixbox.hide();
                $('.notice-nav-item-flag').hide();
            }
        });
        //点击楼梯，跳转。
        $('.notice-nav-fixed .notice-nav-item').on('click', function() {
            $(this).addClass('notice-nav-item-active').siblings().removeClass('notice-nav-item-active');
            $('.notice-nav-item-flag').show().siblings().hide();
            let $boxcengtop = $boxceng.eq($(this).index()).offset().top - 170;
            $('html,body').animate({
                scrollTop: $boxcengtop
            });

        });
    }();
    //数据渲染
    ! function() {
        let $sid = location.search.substring('1').split('=')[1];
        $.ajax({
            url: 'http://10.31.158.15/damai/php/details.php',
            data: {
                pid: $sid
            },
            dataType: 'json'
        }).done(function(data) {
            //console.log(data);
            $('.hd .poster').attr("src", data.url);
            $('.hd .bpic').attr("src", data.url);
            $('.hd .poster').attr("sid", data.sid);
            $('.hd .title').html(data.titile);
            $('.hd .addr').html('场馆：' + data.dizhi);

            var arr = data.prices.split(','); //三种价位转数组
            console.log()
            $('.totol__price b').html(arr[0])
            var str = '';
            $.each(arr, function(index, value) {

                str += ` <div class=" select_right_list_item sku_item"> 
                        <div class="price"> ${value}</div> 
                </div>
                  `;
            });

            $('.select_right_list').html(str);

            //价格 切换
            $('.select_right .select_right_list .sku_item').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                let $num = $('.cafe-c-input-number-input').attr('placeholder'); //数量
                let $dpric = ($(this).find('.price').html()); //单价
                let $pric = $dpric * $num;
                $('.totol__price b').html($pric);

            });

        });
        //数量加减 改变价格
        let $down = $('.cafe-c-input-number-handler-down');
        let $up = $('.cafe-c-input-number-handler-up');
        let $input = $('.cafe-c-input-number-input');
        let $num = 1;
        let $nu = $('.cafe-c-input-number-input').attr('placeholder'); //数量
        let $pri = $('.select_right .select_right_list .sku_item').find('.price').html() * $nu;
        $down.on('click', function() {
            if ($num > 1) {
                $up.removeClass('cafe-c-input-number-handler-disabled');
                $num--;

                $input.attr('placeholder', $num);
            } else {
                $down.addClass('cafe-c-input-number-handler-disabled');
                $num = 1;
                $input.attr('placeholder', $num);
            }
        })
        $up.on('click', function() {
                console.log($('.active').find('.price').html())
                $num++;
                //let $nu = ($('.cafe-c-input-number-input').attr('placeholder')); //数量
                //  let $dpri = ($('.sku_item .active').find('.price').html()); //单价

                // let $pr = $dpri * $nu;
                // $('.totol__price b').html($pr);
                if ($num > 4) {
                    $up.addClass('cafe-c-input-number-handler-disabled');
                    $num = 4;
                } else {
                    $down.removeClass('cafe-c-input-number-handler-disabled');
                    $input.attr('placeholder', $num);

                }



            })
            //放大镜


        ! function() {

            $('.sf').width($('.spic').width() * $('.bf').width() / $('.bpic').width());
            $('.sf').height($('.spic').height() * $('.bf').height() / $('.bpic').height());
            var bili = $('.bpic').width() / $('.spic').width();
            $('.spic').hover(function() {
                    $('.sf').css('visibility', 'visible');
                    $('.bf').css('visibility', 'visible');
                    $(this).on('mousemove', function(ev) {
                        var $left = ev.pageX - $('.poster').offset().left - $('.sf').width() / 2;
                        var $top = ev.pageY - $('.poster').offset().top - $('.sf').height() / 2;
                        if ($left < 0) {
                            $left = 0;
                        } else if ($left >= $('.spic').width() - $('.sf').width()) {
                            $left = $('.spic').width() - $('.sf').width();
                        }
                        if ($top < 0) {
                            $top = 0;
                        } else if ($top >= $('.spic').height() - $('.sf').height()) {
                            $top = $('.spic').height() - $('.sf').height();
                        }
                        $('.sf').css('left', $left);
                        $('.sf').css('top', $top);
                        $('.bpic').css('left', -$left * bili);
                        $('.bpic').css('top', -$top * bili);
                    });
                },
                function() {
                    $('.sf').css('visibility', 'hidden');
                    $('.bf').css('visibility', 'hidden');
                });



        }();
    }();
    //加入购物车
    var $arrid = [];
    var $arrnum = [];
    var $arrpic = [];

    function cookietoarr() {
        if ($.cookie('cookiesid') && $.cookie('cookienum') && $.cookie('cookiepic')) {
            $arrid = $.cookie('cookiesid').split(',');
            $arrnum = $.cookie('cookienum').split(',');
            $arrpic = $.cookie('cookiepic').split(',');
        }
    }
    $('.buybtn').on('click', function() {

        let $sid = $(this).parents('.cont').find('.poster').attr('sid');
        cookietoarr();
        if ($.inArray($sid, $arrid) !== -1) { //存在

            var num = parseInt($arrnum[$.inArray($sid, $arrid)]) + parseInt($('.cafe-c-input-number-input').attr('placeholder'));
            $arrnum[$.inArray($sid, $arrid)] = num;
            $.cookie('cookienum', $arrnum.toString(), 10);

            var pic = parseInt($arrpic[$.inArray($sid, $arrid)]) + parseInt($('.totol__price b').html());
            $arrpic[$.inArray($sid, $arrid)] = pic;
            $.cookie('cookiepic', $arrpic.toString(), 10);

        } else { //不存在
            $arrid.push($sid);
            $.cookie('cookiesid', $arrid.toString(), 7);

            $arrnum.push($('.cafe-c-input-number-input').attr('placeholder'));
            $.cookie('cookienum', $arrnum.toString(), 7);

            $arrpic.push($('.totol__price b').html());
            $.cookie('cookiepic', $arrpic.toString(), 7);
        }
        $('#linkbox').css({ display: 'block' });
        $('#linkbox .xxx').on('click', function() {
            $('#linkbox').css({ display: 'none' })
        })
    })

}()
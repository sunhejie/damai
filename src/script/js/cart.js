! function() {
    function goodslist(id, count, pic) {
        $.ajax({
            url: 'http://10.31.158.15/damai/php/damaidata.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {

                if (id == value.sid) { //遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
                    console.log(count)
                    var $clonebox = $('#component').clone(true, true);
                    // console.log($clonebox.html())
                    $clonebox.find('.next-col .project-name-img').find('img').attr('src', value.url);
                    $clonebox.find('.next-col .project-name-img').find('img').attr('sid', value.sid);
                    $clonebox.find('.project-name-content .title').html(value.titile);

                    $clonebox.find('.next-row .ticket-number-wrapper').html(count);
                    $clonebox.find('.price').html(pic);
                    $clonebox.find('.project-name-content .addr').html(value.dizhi);

                    $clonebox.css('display', 'block');
                    $('#list-container').append($clonebox);

                }
            });
        })
    };
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        var s = $.cookie('cookiesid').split(',');
        var n = $.cookie('cookienum').split(',');
        var p = $.cookie('cookiepic').split(',');

        $.each(s, function(i, value) {
            goodslist(s[i], n[i], p[i]);
        });
    }

    kong();

    function kong() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            $('.empty-cart').hide(); //cookie存在，购物车有商品，隐藏盒子。
        } else {
            $('.empty-cart').show();
        }
    }

    $('.order-list-item').on('click', function(e) {
        e = e || window.event
        let ele = e.target || e.srcElenment
        if (ele.nodeName === 'A') {
            let $value = ele.getAttribute('sid');
            let $fatherlist = ele.parentNode.parentNode.parentNode.parentNode;
            $fatherlist.remove();
            let $arrsid = $.cookie('cookiesid').split(',');
            let $arrnum = $.cookie('cookienum').split(',');
            let $arrpic = $.cookie('cookiepic').split(',');
            $arrsid.splice('$value', 1)
            $arrnum.splice('$value', 1)
            $arrpic.splice('$value', 1)
            $.cookie('cookiesid', $arrsid, { expires: 7 });
            $.cookie('cookienum', $arrnum, { expires: 7 });
            $.cookie('cookiepic', $arrpic, { expires: 7 });

        }
    });

}()
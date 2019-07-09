  //价格 
  ! function() {

      $('#tab .tab_title li').on('click', function() {
          $(this).addClass('active').siblings().removeClass('active');
          $('#tab .tab_content .item').eq($(this).index()).addClass('show123').siblings().removeClass('show123');
      })

  }();
  //详情页-tab切换
  ! function() {
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
          let $boxcengtop = $boxceng.eq($(this).index()).offset().top - 100;
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
          $('.hd .poster').attr("src", data.url);
          $('.hd .poster').attr("sid", data.sid);
          $('.hd .title').attr("sid", data.titile);
          $('.hd .addr').attr("sid", data.dizhi);

          var arr = data.prices.split(','); //三种价位转数组
          $('.hd ').attr("sid", data.dizhi); //三种价位
          var str = '';
          $.each(arr, function(index, value) { //遍历小图路径，拼接到li中后渲染出来
              str += ` <div class="select_right_list_item sku_item"> 
              <div> ${value}< /div> 
              </div>`;
          });
          $('.select_right_list1').html(str);
      })
  }()
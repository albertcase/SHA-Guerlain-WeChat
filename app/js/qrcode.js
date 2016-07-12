$(document).ready(function(){
    $('.qrshow').on('touchstart', function(){
        if($(this).hasClass('qrcode-1')){
            var pophtml = '<div class="myimg">'+$(this).find('.qrcode').html()+'</div><div class="qrdes">扫描或长按二维码<br>关注法国娇兰官方微博</div>';
            Common.qrcodeBox.add(pophtml);
        }else{
            var pophtml = '<div class="myimg">'+$(this).find('.qrcode').html()+'</div><div class="qrdes">扫描或长按二维码<br>前往法国娇兰官方商城</div>';
            Common.qrcodeBox.add(pophtml);
        }

    });

    $('body').on('touchstart','.btn-close', function(){
        $(this).parent().parent().remove();
    });

});
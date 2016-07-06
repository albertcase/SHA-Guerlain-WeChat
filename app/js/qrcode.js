$(document).ready(function(){
    $('.qrshow').on('touchstart', function(){
        var pophtml = $(this).find('.qrcode').html()+'<div class="qrdes">扫描或长按二维码<br>关注法国娇兰官方微博</div>';
        Common.qrcodeBox.add(pophtml);
    });

    $('body').on('touchstart','.btn-close', function(){
        $(this).parent().parent().remove();
    });

});
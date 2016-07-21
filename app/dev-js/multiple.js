$(function(){
    /*For qrcode page*/
    var qrJson = [
        {
            img:'/app/images/qrcode-3.png',
            des:'扫描或长按二维码<br>前往法国娇兰官方公众号'
        },{
            img:'/app/images/qrcode-2.png',
            des:'扫描或长按二维码<br>前往法国娇兰官方商城'
        },{
            img:'/app/images/qrcode-1.png',
            des:'扫描或长按二维码<br>关注法国娇兰官方微博'
        }
    ];
    $('.qrshow .qrcode').on('touchstart', function(){

        var theIndex = $(this).parent().index();
        var pophtml = '<div class="myimg"><img src="'+qrJson[theIndex].img+'"></div><div class="qrdes">'+qrJson[theIndex].des+'</div>';
        Common.qrcodeBox.add(pophtml);

    });

    $('body').on('touchstart','.btn-close', function(){
        $(this).parent().parent().remove();
    });
    /*----End qrcode page---*/

    /*For slideshow page*/
    if((".slideshow").length){
        $(".slideshow").slidesjs({
            width: 1200,
            height: 800
        });
    }
    /*----End slideshow page---*/

});
$(function(){
    $(".slideshow").slidesjs({
        width: 940,
        height: 528
    });

//    btn-booking
//    $('.btn-booking').on('click',function(){
//        console.log($(this).attr('title'));
//        window.location.href = 'online-booking.html?service='+'VIP服务';
//    });





});
function gotoBookingPage(first,second){
    window.location.href = 'online-booking.html?servicefirst='+first+'&servicesecond='+second;
}
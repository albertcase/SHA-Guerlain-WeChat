$(function(){
    $(".slideshow").slidesjs({
        width: 940,
        height: 528
    });

});
function gotoBookingPage(first,second){
    window.location.href = 'online-booking.html?servicefirst='+first+'&servicesecond='+second;
}
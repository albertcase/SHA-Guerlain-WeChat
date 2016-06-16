$(function(){
    $(".slideshow").slidesjs({
        width: 940,
        height: 528
    });

    $('.test').on('click', function(){
        //alert(1);
        var formHtml = '<form action="" id="form-contact">'+
            '<div class="form-information">'+
            '<div class="input-box input-box-callname">'+
            '<select name="callname" id="input-callname">'+
            '<option value="">称呼</option>'+
            '<option value="先生">先生</option>'+
            '<option value="女士">女士</option>'+
            '</select>'+
            '</div>'+
            '<div class="input-box input-box-surname">'+
            '<input type="text" id="input-surname" placeholder="姓"/>'+
            '</div>'+
            '<div class="input-box input-box-name">'+
            '<input type="text" id="input-name" placeholder="名"/>'+
            '</div>'+
            '<div class="input-box input-box-mobile">'+
        '<input type="tel" id="input-mobile" placeholder="联系电话"/>'+
        '</div>'+
        '<div class="input-box input-box-email">'+
        '<input type="email" id="input-email" placeholder="电子邮件"/>'+
        '</div>'+
        '</div></form>';
        Common.popupBox.add(formHtml);
    });




});
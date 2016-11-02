$(function(){
    //redirect
    $('.btn-get').on('click', function(){
        window.location.href = "form-getbenefits.html";
    });

    //switch-checkbox
    $('.switch-checkbox').on('touchstart', function(){
        $(this).toggleClass('selected');
    });

    //show-terms
    $('.show-terms').on('touchstart', function(){
        var popContent = '<h3 class="title">条款及条件</h3><div class="popcontent"><p>1.	本次活动自10月3日起，限前1000名关注者领取活动赠品，数量有限，赠完为止。</p><p>2.	本次活动只限中国大陆地区参与，敬请谅解。</p><p>3.	在符合法律相关规定的情况下，您必须同意活动主办方获得您的姓名，头像与个人信息，主办方并不需要为此再支付额外费用。</p><p>4.	本活动的最终解释权归法国娇兰香榭丽舍大道68号娇兰之家所有。</p></div>';

        Common.popupBox.add(popContent);
    });

    //form validate
    function formValidate(){
        var validate = true,
            inputName = document.getElementById('input-name'),
            inputMobile = document.getElementById('input-mobile'),
            inputAddress = document.getElementById('input-address');

        if(!inputName.value){
            Common.addClass(inputName.parentElement,'error');
            validate = false;
        }else{
            Common.removeClass(inputName.parentElement,'error');
        }

        if(!inputMobile.value){
            Common.addClass(inputMobile.parentElement,'error');
            validate = false;
        }else{
            Common.removeClass(inputMobile.parentElement,'error');
        }

        if(!inputAddress.value){
            Common.addClass(inputAddress.parentElement,'error');
            validate = false;
        }else{
            Common.removeClass(inputAddress.parentElement,'error');
        }

        if(!$('.switch-checkbox').hasClass('selected')){
            Common.alertBox.add('请勾选条款及条件');
            validate = false;
        };

        if(validate){
            return true;
        }
        return false;
    };

    function submitForm(){

        /*
         * Submit the Form
         */
        var btnSubmit = $('.btn-submit-gbform');
        var enableSubmit = true;
        btnSubmit.on('touchstart',function(e){
            e.preventDefault();
            if(formValidate()){
                if(!enableSubmit) return;
                enableSubmit = false;
                Common.msgBox('loading...');
                //    start to get keycode
                var inputNameVal = document.getElementById('input-name').value,
                    inputMobileVal = document.getElementById('input-mobile').value,
                    inputAddressVal = document.getElementById('input-address').value;
                $.ajax({
                    url:'/api/info',
                    type:'POST',
                    dataType:'json',
                    data:{
                        name:inputNameVal,
                        mobile:inputMobileVal,
                        address:inputAddressVal
                    },
                    success:function(data){
                        $('.ajaxpop').remove();
                        enableSubmit = true;
                        if(data.code == 1){
                            //alert('提交成功');
                            Common.alertBox.add('您已提交成功');
                        }else{
                            Common.alertBox.add(data.msg);
                        }
                    }
                });


            };
        });
    }
    submitForm();


});
$(function(){
    //redirect
    $('.btn-get').on('click', function(){
        window.location.href = "form-getbenefits.html";
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
                        enableSubmit = true;
                        if(data.code == 1){
                            //alert('提交成功');
                            Common.alertBox.add('您已提交成功，娇兰之家随后会通过电话或者邮件直接联系您。');
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
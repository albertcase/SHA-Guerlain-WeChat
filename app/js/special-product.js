//redpacket
;(function(){
    'use strict';
    var controller = function(){
        this.isShake = false;
        this.mobileVal = '';
        //if submitted and record user msg, hasLogged is true
        this.hasLogged = false;
    };
    controller.prototype = {
        init:function(){
            //loading all the resourse, such as css,js,image
            var self = this;
            //self.bindEvent();
            //self.presenvationDate();
        },
        //bind all element event,such as click, touchstart
        bindEvent:function(){
            var self = this;

            //click get keycode button
            //self.submitForm();

            //register change event for each select element
            var selectEle = document.getElementsByTagName('select');
            function removeFirst(e){
                if(!this.children[0].value){
                    this.children[0].remove();
                    Common.addClass(this,'actived');
                }
            }
            for(var i=0;i<selectEle.length;i++){
                selectEle[i].addEventListener('change', removeFirst, false);
            }






        },
        presenvationDate:function(){
            var self = this,
                bookingTimeEle = document.getElementById('input-booking-time');
            /*
            * time need show the next three month from tommorrow
            *
            * */
            var curDate = new Date(),
                curYear = curDate.getFullYear(),
                curMonth = curDate.getMonth()+1,
                curDay = curDate.getDate()+1;
            var dateHtml = '';
            var nextMonth = curMonth,
                nextYear = curYear;

            for(var k=1;k<90;k++){

                if(nextMonth>0 && nextMonth<8){
                //    1-7
                    if(nextMonth%2){
                      //    奇数月
                        if(curDay>31){
                            curDay = 1;
                            nextMonth++;
                        }
                    }else{

                        if(nextMonth==2){
                            //2月份
                            if(nextYear%4){
                            //    非闰年
                                if(curDay>28){
                                    curDay = 1;
                                    nextMonth++;
                                }
                            }else{
                            //    闰年
                                if(curDay>29){
                                    curDay = 1;
                                    nextMonth++;
                                }
                            }

                        }else{
                            //非2月份
                            if(curDay>30){
                                curDay = 1;
                                nextMonth++;
                            }
                        }


                    }
                }else if(nextMonth>7 && nextMonth<13){
                //    8-12
                    if(nextMonth%2){
                        //    奇数月
                        if(curDay>30){
                            curDay = 1;
                            nextMonth++;
                        }
                    }else{
                        if(curDay>31){
                            curDay = 1;
                            nextMonth++;
                        }
                    }
                }

                if(nextMonth>12){
                    nextMonth = 1;
                    nextYear++;
                }
                dateHtml = dateHtml+'<option value="">'+nextMonth+'月'+curDay+'日</option>';
                curDay++;
            }

            bookingTimeEle.innerHTML = dateHtml;

        },
        formValidate:function(){
            var self = this;
            var validate = true,
                inputCallname = document.getElementById('input-callname'),
                inputSurname = document.getElementById('input-surname'),
                inputName = document.getElementById('input-name'),
                inputMobile = document.getElementById('input-mobile'),
                inputEmail = document.getElementById('input-email'),
                inputSelect1 = document.getElementById('input-select-1'),
                inputSelect2 = document.getElementById('input-select-2'),
                inputSelect3 = document.getElementById('input-select-3'),
                inputBookingTime = document.getElementById('input-booking-time');

            if(!inputCallname.value){
                Common.addClass(inputCallname.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputCallname.parentElement,'error');
            }

            if(!inputSurname.value){
                Common.addClass(inputSurname.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputSurname.parentElement,'error');
            }

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
                var reg=/^1\d{10}$/;
                if(!(reg.test(inputMobile.value))){
                    validate = false;
                    Common.addClass(inputMobile.parentElement,'error');
                }else{
                    Common.removeClass(inputMobile.parentElement,'error');
                }
            }

            if(!inputEmail.value){
                Common.addClass(inputEmail.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputEmail.parentElement,'error');
            }


            if(!inputSelect1.value){
                Common.addClass(inputSelect1.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputSelect1.parentElement,'error');
            }

            if(!inputSelect2.value){
                Common.addClass(inputSelect2.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputSelect2.parentElement,'error');
            }

            if(!inputSelect3.value){
                Common.addClass(inputSelect3.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputSelect3.parentElement,'error');
            }

            if(!inputBookingTime.value){
                Common.addClass(inputBookingTime.parentElement,'error');
                validate = false;
            }else{
                Common.removeClass(inputBookingTime.parentElement,'error');
            }


            if(validate){
                return true;
            }
            return false;
        },
        submitForm:function(){
            var self = this;

            /*
             * Submit the Form, so we need FormKeycodeValidate first and then api
             */
            var btnSubmit = document.getElementsByClassName('btn-submit')[0];
            var enableSubmit = true;
            btnSubmit.addEventListener('touchstart',function(e){
                e.preventDefault();
                if(self.formValidate()){
                    if(!enableSubmit) return;
                    enableSubmit = false;
                    //    start to get keycode
                    var inputCallnameVal = document.getElementById('input-callname').value,
                        inputSurnameVal = document.getElementById('input-surname').value,
                        inputNameVal = document.getElementById('input-name').value,
                        inputMobileVal = document.getElementById('input-mobile').value,
                        inputEmailVal = document.getElementById('input-email').value,
                        inputSelect1Val = document.getElementById('input-select-1').value,
                        inputSelect2Val = document.getElementById('input-select-2').value,
                        inputSelect3Val = document.getElementById('input-select-3').value,
                        inputBookingTimeVal = document.getElementById('input-booking-time').value,
                        inputContactEle = document.getElementsByTagName('input-contact'),
                        inputContactValue = '电子邮件';

                    for(var i=0;i<inputContactEle.length;i++){
                        if(inputContactEle[i].checked){
                            inputContactValue = inputContactEle[i].value;
                        }
                    };

                    console.log('inputCallnameVal'+inputCallnameVal+'inputSurnameVal'+inputSurnameVal+'inputNameVal'+inputNameVal+'inputMobileVal'+inputMobileVal+'inputEmailVal'+inputEmailVal+'inputSelect1Val'+inputSelect1Val+'inputSelect2Val'+inputSelect2Val+'inputSelect3Val'+inputSelect3Val+'inputBookingTimeVal'+inputBookingTimeVal);



                };
            });
        },
        //倒计时
        countDown:function(){
            var countdownTime = 59,
                btnGetKeycode = document.getElementsByClassName('btn-getkeycode')[0];
            var countdownline = setInterval(function(){
                countdownTime--;
                Common.addClass(btnGetKeycode,'countdown');
                btnGetKeycode.innerHTML = countdownTime;
                if(countdownTime<=0){
                    clearInterval(countdownline);
                    Common.removeClass(btnGetKeycode,'countdown');
                    btnGetKeycode.innerHTML = '';
                }
            },1000);

        },
        /*
        * get redpacket
        * */
        getRedpacket:function(){
            Api.getRedpacket({},function(data){
                if(data.status == 1){
                    Common.removeClass(document.getElementsByClassName('qrcode-pop')[0],'hide');
                }else{
                    Common.alertBox.add(data.msg);
                }
            });
        },

        //

        compareCommand:function(commandline){
            /*
            * If the input command is right, then upload the command to server.
            * Show different message according input command.
            * The commandline is input value
            * */
            var self = this;
        },


    };

    if (typeof define === 'function' && define.amd){
        // we have an AMD loader.
        define(function(){
            return controller;
        });
    }
    else {
        this.controller = controller;
    }


}).call(this);

window.addEventListener('load', function(){
    var redpacket= new controller();
    redpacket.init();
});
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
            //    loading first
            var baseurl = ''+'/app';
            var imagesArray = [
                baseurl + '/images/logo.png',
                baseurl + '/images/p1-bg.jpg',
                baseurl + '/images/p1-2.png',
                baseurl + '/images/p1-3.png',
                baseurl + '/images/p1-4.png',
                baseurl + '/images/p2-bg.jpg',
                baseurl + '/images/p2-pop-text.png',
                baseurl + '/images/p3-bg.jpg',
                baseurl + '/images/btn-getkeycode.png',
                baseurl + '/images/btn-getmoney.png',
                baseurl + '/images/button-ok.png',
                baseurl + '/images/follow-text.png',
                baseurl + '/images/input-border.png',
                baseurl + '/images/link-privacy.png',
                baseurl + '/images/money.png',
                baseurl + '/images/qrcode-follow.png',
                baseurl + '/images/shake-text.png',
                baseurl + '/images/tips.png',
                baseurl + '/images/tips-text.png',
                baseurl + '/images/yuan.png'
            ];
            var i = 0;
            new preLoader(imagesArray, {
                onProgress: function(){

                },
                onComplete: function(){
                    //show age pop
                    document.getElementsByClassName('preloading')[0].remove();
                    Common.removeClass(document.getElementsByClassName('tips-pop')[0],'hide');

                    //bind all dom element
                    self.bindEvent();
                    //gotoPin(2);

                }
            })
        },
        //bind all element event,such as click, touchstart
        bindEvent:function(){
            var self = this;

            //age above 18, click yes, start game
            var btnYes = document.getElementsByClassName('btn-tips-yes')[0];
            btnYes.addEventListener('touchstart', function(){

                Common.addClass(btnYes.parentElement.parentElement,'hide');
                Api.isLogin(function(data){

                    if(data.status==1){
                        if(data.msg.money>0){
                            //go money page
                            gotoPin(2);
                            document.getElementById('money-value').innerHTML = parseInt(data.msg.money)/100;

                        }else{
                            gotoPin(0);
                            self.isShake = true;
                        }

                        //islogged
                        if(data.msg.mobile){
                            self.hasLogged = true;
                            self.mobileVal = data.msg.mobile;
                        }else{
                            self.hasLogged = false;
                        }

                    }else if(data.status == 0){
                        //not authorization
                        window.location.href = 'http://oauth.curio.im/v1/wx/web/auth/29b95ed3-502b-4c44-9084-b978b287c1fb';
                    }
                });
            });

            //age below 18, click no, stop game, quit wechat
            var btnNo = document.getElementsByClassName('btn-tips-no')[0];
            btnNo.addEventListener('touchstart', function(){
                WeixinJSBridge.call('closeWindow');
            });

            //   start shake
            //listen to shake event
            var shakeEvent = new Shake({threshold: 15});
            shakeEvent.start();
            window.addEventListener('shake', function(){
                if(!self.isShake) return;
                self.shake();
                self.isShake = false;
            }, false);

            //test shake function
            document.getElementsByClassName('btn-open')[0].addEventListener('touchstart', function(){
                if(!self.isShake) return;
                self.shake();
                self.isShake = false;
            });

            //check if shake is supported or not.
            if(!("ondevicemotion" in window)){alert("Not Supported");}

            //click get keycode button
            self.SubmitKeycodeForm();

            //    getRedpacket
            var btnGetRedpacket = document.getElementById('btn-getredpacket');
            var enableGetPacket = true;
            btnGetRedpacket.addEventListener('touchstart', function(){
                _hmt.push(['_trackEvent', 'buttons', 'click', '领取红包']);
                if(!enableGetPacket) return;
                enableGetPacket = false;
                self.getRedpacket();
            });

            //show the privacy pop
            var linkPrivacy = document.getElementsByClassName('privacy-term')[0];
            linkPrivacy.addEventListener('touchstart',function(){
                //$('.term-pop').removeClass('hide').addClass('animate fade');
                Common.removeClass(document.getElementsByClassName('term-pop')[0],'hide');
            });

            //    closePop
            document.getElementsByClassName('btn-close')[0].addEventListener('touchstart',function(){
                Common.addClass(document.getElementsByClassName('term-pop')[0],'hide');
            });

        //    close alertbox
            $('body').on('touchstart','.btn-alert-ok',function(){
                Common.alertBox.remove();
            });

        },

        //shake function
        shake:function(){
            var self = this;
            //if shake success, go form page
            var mobileInput = document.getElementById('input-phone');
            if(self.hasLogged){
                //hide keycode box, disable mobile input
                document.getElementById('input-keycode').parentNode.style.display = 'none';
                mobileInput.value = self.mobileVal;
                mobileInput.disabled = true;
            }
            gotoPin(1);
        },

        //form function
        MobileValidate:function(){
            var validate = true,
                inputMobile = document.getElementById('input-phone');
            if(!inputMobile.value){
                Common.errorMsg.add(inputMobile.parentElement,'手机号码不能为空');
                validate = false;
            }else{
                var reg=/^1\d{10}$/;
                if(!(reg.test(inputMobile.value))){
                    validate = false;
                    Common.errorMsg.add(inputMobile.parentElement,'手机号格式错误，请重新输入');
                }else{
                    Common.errorMsg.remove(inputMobile.parentElement);
                }
            }
            if(validate){
                return true;
            }
            return false;
        },
        FormKeycodeValidate:function(){
            var self = this;
            var validate = true,
                inputMobile = document.getElementById('input-phone'),
                inputKeyCode = document.getElementById('input-keycode'),
                inputCoupon = document.getElementById('input-coupon');
            if(!inputMobile.value){
                Common.errorMsg.add(inputMobile.parentElement,'手机号码不能为空');
                validate = false;
            }else{
                var reg=/^1\d{10}$/;
                if(!(reg.test(inputMobile.value))){
                    validate = false;
                    Common.errorMsg.add(inputMobile.parentElement,'手机号格式错误，请重新输入');
                }else{
                    Common.errorMsg.remove(inputMobile.parentElement);
                }
            }
            //for keycode
            if(!self.hasLogged){
                if(!inputKeyCode.value){
                    Common.errorMsg.add(inputKeyCode.parentElement,'验证码不能为空');
                    validate = false;
                }else{
                    Common.errorMsg.remove(inputKeyCode.parentElement);
                }
            }

            //for coupon
            if(!inputCoupon.value){
                Common.errorMsg.add(inputCoupon.parentElement,'兑换码不能为空');
                validate = false;
            }else{
                Common.errorMsg.remove(inputCoupon.parentElement);
            }

            if(validate){
                return true;
            }
            return false;
        },
        SubmitKeycodeForm:function(){
            var self = this;

            /*
             *click get keycode button, validate mobile first and then connect api to sent user message
             */
            var enableClick = true;
            var btnGetKeycode = document.getElementsByClassName('btn-getkeycode')[0],
                inpueMobile = document.getElementById('input-phone');
            btnGetKeycode.addEventListener('touchstart',function(e){
                e.preventDefault();
                if(self.MobileValidate()){
                    //    start to get keycode
                    if(!enableClick) return;
                    enableClick = false;
                    var mobile = inpueMobile.value;
                    if(!Common.hasClass(btnGetKeycode,'countdown')){
                        self.countDown();
                        Api.getKeycode({
                            mobile:mobile
                        },function(data){
                            enableClick = true;
                            if(data.status == 1){
                                Common.alertBox.add('短信发送成功，请注意查收');
                            }else{
                                Common.alertBox.add(data.msg);
                            }

                        });
                    }

                };
            });

            /*
             * Submit the Form, so we need FormKeycodeValidate first and then api
             */
            var btnSubmit = document.getElementsByClassName('btn-submit')[0];
            var enableSubmit = true;
            btnSubmit.addEventListener('touchstart',function(){
                _hmt.push(['_trackEvent', 'buttons', 'click', '提交表单']);
                if(self.FormKeycodeValidate()){
                    if(!enableSubmit) return;
                    enableSubmit = false;
                    //    start to get keycode
                    var phonenumber = document.getElementById('input-phone').value,
                        keyCode = document.getElementById('input-keycode').value,
                        coponCode = document.getElementById('input-coupon').value;
                    if(self.hasLogged){
                        //submitted before
                        Api.submitWithoutChecknum({
                            mobile:phonenumber,
                            code:coponCode
                        },function(data){
                            enableSubmit = true;
                            if(data.status == 1){
                                document.getElementById('money-value').innerHTML = parseInt(data.msg)/100;
                                gotoPin(2);
                            }else{
                                Common.alertBox.add(data.msg);
                            }

                        });
                    }else{
                        // never submitted
                        Api.submitAll({
                            mobile:phonenumber,
                            checknum:keyCode,
                            code:coponCode
                        },function(data){
                            enableSubmit = true;
                            if(data.status==1){
                                document.getElementById('money-value').innerHTML = parseInt(data.msg)/100;
                                gotoPin(2);
                            }else{
                                Common.alertBox.add(data.msg);
                            }
                        });

                    }

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
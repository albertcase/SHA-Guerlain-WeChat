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
            self.bindEvent();

            // get 'service' name of url parameter
            var servicefirst = Common.queryString().servicefirst,
                servicesecond = Common.queryString().servicesecond;
            self.updateService(servicefirst,servicesecond);

        },
        //bind all element event,such as click, touchstart
        bindEvent:function(){
            var self = this;

            //click get keycode button
            self.submitForm();

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
        presenvationDate:function(item){
            var self = this,
                bookingTimeEle = document.getElementById('input-booking-date');
            /*item is represent: 0 is 水疗中心,1 is VIP服务, 2 is 定制服务, 3 is Le 68餐厅 */

            /*
            * time need show the next three month from tommorrow
            *
            * */
            var weekname = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
            var curDate = new Date(),
                curYear = curDate.getFullYear(),
                curMonth = curDate.getMonth()+1,
                curDay = curDate.getDate()+ 1,
                curWeek = curDate.getDay();
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
                if(curWeek>6){
                    curWeek = 0;
                }

                /*item is represent: 0 is 水疗中心,1 is VIP服务, 2 is 定制服务, 3 is Le 68餐厅 */
                if(item == '0'){
                //    水疗中心,周日休息
                    if(!(curWeek==6) ){
                        dateHtml = dateHtml+'<option value="'+nextMonth+'月'+curDay+'日 '+weekname[curWeek]+'">'+nextMonth+'月'+curDay+'日 '+weekname[curWeek]+'</option>';
                    }

                }else{
                    dateHtml = dateHtml+'<option value="'+nextMonth+'月'+curDay+'日 '+weekname[curWeek]+'">'+nextMonth+'月'+curDay+'日 '+weekname[curWeek]+'</option>';
                }

                curDay++;
                curWeek++;

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
                inputEmail = document.getElementById('input-email');

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


            if(validate){
                return true;
            }
            return false;
        },
        updateService:function(firstservice,secondservice){
            var self = this;
            var selectEle_1 = $('#input-select-1'),
                selectEle_2 = $('#input-select-2'),
                selectEle_3 = $('#input-select-3'),
                selectBox_1 = $('.input-box-select-1'),
                selectBox_2 = $('.input-box-select-2'),
                selectBox_3 = $('.input-box-select-3'),
                selectWrapEle = $('.panel-select');
            var serviceJson = Api.serviceJson;

            /*select first option and then displat other*/
            selectEle_1.on('change',function(){

                for(var i in serviceJson){

                    if(serviceJson[i].title == $(this).val()){
                        self.initService(i,0);
                    }

                }
            });

                //load first
            if(firstservice){

                for(var i in serviceJson){

                    if(serviceJson[i].title == firstservice){

                        if(serviceJson[i].type){
                            for(var j in serviceJson[i].type){
                                if(serviceJson[i].type[j].name == secondservice){

                                    self.initService(i,j);
                                    return;
                                }
                            }
                        }else{
                            self.initService(i,0);
                        }

                        //return;
                    }else{

                        if(i==serviceJson.length-1){
                            self.initService(0,0);
                        }
                    }

                }


            }else{
                /*no select option,load all option*/
                /*append all option to first select*/
                self.initService(0,0);
            }


        },
        initService:function(index,index2){
            var self = this;
            var selectEle_1 = $('#input-select-1'),
                selectEle_2 = $('#input-select-2'),
                selectEle_3 = $('#input-select-3'),
                selectBox_1 = $('.input-box-select-1'),
                selectBox_2 = $('.input-box-select-2'),
                selectBox_3 = $('.input-box-select-3'),
                selectWrapEle = $('.panel-select'),
                timeLimit = $('.time-limit');
            var serviceJson = Api.serviceJson;
            var optionHtml = '';
            //selectEle_1.val(serviceJson[index].title);
            self.presenvationDate(index);

            for(var i in serviceJson){
                optionHtml =  optionHtml+'<option value="'+serviceJson[i].title+'">'+serviceJson[i].title+'</option>';
            }
            selectEle_1.html(optionHtml).val(serviceJson[index].title);

            //load time
            if(serviceJson[index].time){
                timeLimit.html('<p>'+serviceJson[index].time+'</p>');
            }else{
                timeLimit.html('');
            }

            /*load second*/
            var secondSelectHtml = '';
            if(serviceJson[index].type){
                selectBox_2.removeClass('hide');
                for(var j in serviceJson[index].type){
                    secondSelectHtml = secondSelectHtml+'<option value="'+serviceJson[index].type[j].name+'">'+serviceJson[index].type[j].name+'</option>';
                }
                selectEle_2.html(secondSelectHtml);
                //console.log(index2);
                selectEle_2.val(serviceJson[index].type[index2].name);
            }else{
                selectBox_2.addClass('hide');
                selectEle_2.html('');
            }
        },
        submitForm:function(){
            var self = this;

            /*
             * Submit the Form
             */
            var btnSubmit = $('.btn-submit');
            var enableSubmit = true;
            btnSubmit.on('touchstart',function(e){
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
                        inputBookingDateVal = document.getElementById('input-booking-date').value,
                        inputAdviceVal = document.getElementById('youradvice').value,
                        inputContactEle = document.getElementsByTagName('input-contact'),
                        inputContactValue = '电子邮件';
                    for(var i=0;i<inputContactEle.length;i++){
                        if(inputContactEle[i].checked){
                            inputContactValue = inputContactEle[i].value;
                        }
                    };
                    Api.submitAll({
                        sex:inputCallnameVal,
                        first:inputSurnameVal,
                        second:inputNameVal,
                        mobile:inputMobileVal,
                        email:inputEmailVal,
                        type:inputContactValue,
                        bak1:inputSelect1Val,
                        bak2:inputSelect2Val,
                        bak3:inputSelect3Val,
                        date:inputBookingDateVal,
                        comment:inputAdviceVal
                    },function(data){
                        if(data.status == 1){
                            //alert('提交成功');
                            Common.alertBox.add('提交成功');
                        }else{
                            Common.alertBox.add(data.msg);
                        }
                    });


                };
            });
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
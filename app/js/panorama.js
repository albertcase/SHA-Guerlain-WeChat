;(function(){

    var panorama = function(){
        this.selectedItem = 0;
    };
    panorama.prototype = {

        init:function(){
            var self = this;
            self.bindEvent();
        },
        bindEvent:function(){
            var self = this;
            var ele = $('.panorama img');
            self.centerImg(ele);
        },
        centerImg:function(ele){

            var self = this;
            var winWidth = $(window).width(),
                imgClientWidth = ele.width(),
                ImgTranslateX = 0,
                maxTranslateX = winWidth-imgClientWidth,
                minTranslateX = 0,
                CurTranslateX = Math.floor(winWidth/2-imgClientWidth/2),
                middleTranslateX  = Math.floor(winWidth/2-imgClientWidth/2),
                perX = Math.floor(maxTranslateX / 45)
                ;

            //init the img
            ele.css({
                '-webkit-transform':'translateX('+middleTranslateX+'px)',
                '-moz-transform':'translateX('+middleTranslateX+'px)',
                '-o-transform':  'translateX('+middleTranslateX+'px)',
                'transform':     'translateX('+middleTranslateX+'px)'
            });

            //start device orientation

            if (window.DeviceOrientationEvent) {
                //document.getElementById("").innerHTML = "DeviceOrientation";
                // Listen for the deviceorientation event and handle the raw data
                var i = 0,tiltLR2 = 0;
                window.addEventListener('deviceorientation', function(eventData) {
                    //console.log(eventData);
                    // gamma is the left-to-right tilt in degrees, where right is positive
                    var tiltLR = eventData.gamma;
                    CurTranslateX =middleTranslateX+perX*tiltLR;
                    if(CurTranslateX<maxTranslateX){
                        CurTranslateX = maxTranslateX;
                    }else if(CurTranslateX>minTranslateX){
                        CurTranslateX = minTranslateX;
                    }
                    $('.top').html(CurTranslateX);
                    ele.css({
                        '-webkit-transform':'translateX('+CurTranslateX+'px)',
                        '-moz-transform':'translateX('+CurTranslateX+'px)',
                        '-o-transform':  'translateX('+CurTranslateX+'px)',
                        'transform':     'translateX('+CurTranslateX+'px)'
                    });

                }, false);
            } else {
                alert('Not supported.');
            }
        },


    };

    if (typeof define === 'function' && define.amd){
        // we have an AMD loader.
        define(function(){
            return panorama;
        });
    }
    else {
        this.panorama = panorama;
    }

}).call(this);

$(document).ready(function(){

    //when the img loaded,then show the position
    $('.panorama img').on('load',function(){
        var customStart = new panorama();
        customStart.init();
    });


});
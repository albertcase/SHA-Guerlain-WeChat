;(function(){

    var panorama = function(){
        this.selectedItem = 0;
    };
    panorama.prototype = {

        init:function(){
            var self = this;
            self.bindEvent();

            //hide the tips
            var hideTips = setTimeout(function(){
                $('.tips').hide(1000);
                clearTimeout(hideTips);
            },3000);
            
        },
        bindEvent:function(){
            var self = this;

            //load pop
            Common.popupBox.add('<p class="pop-content">通过全景图感受娇兰香榭丽舍68号,门店、中层楼、水疗中心、Le 68,餐厅的视觉体验，探索娇兰之家的奥秘。</p>','panorama-pop');

            var ele = $('.panorama img');
            self.centerImg(ele);
            self.touchTo();
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
        touchTo:function(pos){

        }



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

    if(Common.queryString().id){
        $('#panorama img').attr('src',"/app/images/panorama/panorama-"+Common.queryString().id+".jpg");
    }else{
        $('#panorama img').attr('src',"/app/images/panorama/panorama-1.jpg");
    }

    //when the img loaded,then show the position
    $('.panorama img').on('load',function(){
        var customStart = new panorama();
        customStart.init();
    });


});
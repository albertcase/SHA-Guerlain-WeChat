;(function(){

    var panorama = function(ele){

            this.obj = {
                ele:ele,
                winWidth:$(window).width(),
                imgClientWidth:ele.width(),
                minTranslateX:$(window).width()-ele.width(),
                maxTranslateX :0,
                CurTranslateX:Math.floor($(window).width()/2-ele.width()/2),
                middleTranslateX:Math.floor($(window).width()/2-ele.width()/2),
                perX:10
            };

        //console.log(this.obj);
    };
    panorama.prototype = {

        init:function(){
            var self = this;
            self.bindEvent();
            self.centerImg(self.obj.ele);
            self.touchTo();
            //
            ////hide the tips
            var hideTips = setTimeout(function(){
                $('.tips').hide(1000);
                clearTimeout(hideTips);
            },3000);

        },
        bindEvent:function(){
            var self = this;

            //load pop
            Common.popupBox.add('<p class="pop-content">通过全景图感受娇兰香榭丽舍68号,门店、中层楼、水疗中心、Le 68,餐厅的视觉体验，探索娇兰之家的奥秘。</p>','panorama-pop');

        },
        centerImg:function(ele){

            var self = this;

            //init the img
            self.curImgTransform(self.obj.CurTranslateX);
            if (window.DeviceOrientationEvent) {
                //document.getElementById("").innerHTML = "DeviceOrientation";
                // Listen for the deviceorientation event and handle the raw data
                var i = 0,tiltLR2 = 0,tiltLR1=0;
                window.addEventListener('deviceorientation', bbb, false);

                var aaa  = setTimeout(function(){

                    window.removeEventListener('deviceorientation',bbb,false);
                    window.addEventListener('deviceorientation', function(e){
                        tiltLR2 = e.gamma;
                        var distance = Math.floor(tiltLR2 - tiltLR1);
                        if(distance>10){
                            distance = 1;
                        }else if(distance<-10){
                            distance = -1;
                        }else{
                            distance = 0;
                        }
                        self.obj.CurTranslateX = self.obj.CurTranslateX+(self.obj.perX)*distance;
                        self.curImgTransform(self.obj.CurTranslateX);


                    }, false);

                    clearTimeout(aaa);

                },3000)

            } else {
                alert('Not supported.');
            }

            function bbb(eventData){
                //// gamma is the left-to-right tilt in degrees, where right is positive
                tiltLR1 = eventData.gamma;

            }
        },
        curImgTransform:function(){

            var self = this;
            if(self.obj.CurTranslateX<self.obj.minTranslateX){
                self.obj.CurTranslateX = self.obj.minTranslateX;
            }else if(self.obj.CurTranslateX>self.obj.maxTranslateX){
                self.obj.CurTranslateX = self.obj.maxTranslateX;
            }
            this.obj.ele.css({
                '-webkit-transform':'translateX('+self.obj.CurTranslateX+'px)',
                '-moz-transform':'translateX('+self.obj.CurTranslateX+'px)',
                '-o-transform':  'translateX('+self.obj.CurTranslateX+'px)',
                'transform':     'translateX('+self.obj.CurTranslateX+'px)'
            });
        },
        touchTo:function(pos){
            var self = this;
            var firstX = 0,secondX = 0,x = 0;
            $('#panorama').on('touchstart',function(e){

                firstX = e.touches[0].clientX;

            });
            $('#panorama').on('touchmove',function(e){

                secondX = e.touches[0].clientX;
                x = Math.ceil(secondX - firstX);
                if(secondX>firstX){
                    //console.log("right");
                    self.obj.CurTranslateX = self.obj.CurTranslateX+(self.obj.perX);
                }else if(secondX<firstX){
                    //console.log("left");
                    self.obj.CurTranslateX = self.obj.CurTranslateX-self.obj.perX;
                }
                self.curImgTransform(self.obj.CurTranslateX);


            });

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

        var ele=$('.panorama img');
        var customStart = new panorama(ele);

        customStart.init();
    });


});
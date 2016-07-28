;(function(){

    var custom = function(){
        this.selectedItem = 0;
        this.step = 1;
    };
    custom.prototype = {

        init:function(){
            var self = this;
            self.bindEvent();
        },
        bindEvent:function(){
            var self = this;

            //selected the item
            $('.lists-custom .item').on('touchstart', function(){
                $('.lists-custom .item').removeClass('selected');
                $(this).addClass('selected');
                self.selectedItem = $(this).index();
            });

            $('.btn-back').on('click', function(){
                $('.step').removeClass('current');
                $('.first-step').addClass('current');
                self.step = 1;
                $('.btn-next').html('下一步');
                $('.btn-back').addClass('hide');
            });

            // go next step, show details
            $('.btn-next').on('touchstart',function(){

                var i = self.selectedItem;
                if(self.step == 1){
                    //go next step
                    $('.step').removeClass('current');
                    $('.second-step').addClass('current');
                    $(this).html('预约服务');
                    var detailsHtml = '<div class="c-img">'+
                        '<img src="'+self.itemJson[i].img+'" alt=""/>'+
                        '<div class="price"><span>价格店洽</span></div>'+
                        '</div>'+
                        '<div class="c-desc">'+
                        '<h4>'+self.itemJson[i].name+'</h4>'+
                        '<p class="desc">'+
                        '</p>'+self.itemJson[i].desc+
                        '</div>';
                    $('.details-custom').html(detailsHtml);
                    $('.btn-back').removeClass('hide');
                    self.step = 2;
                }else{
                    // go online booking
                    Common.gotoBookingPage('定制服务',self.itemJson[i].name);
                }

            });

        },
        itemJson:[
            {
                name:'丝带配选',
                desc:'法国娇兰与香水之间的故事是特别的。为了尽情展现这个亲密且珍贵的关系，法国娇兰将您的姓名或者缩写字母刻在香水瓶身，赋予它独特的气质。除了刻字服务，优雅的巴黎女人还会选择在香水瓶颈位置系上自己喜爱的罗缎丝带，多种颜色可供选择。这些珍贵定制的丝带是通过来自吕内维尔优秀的工匠手工制成，他们继承了传统技艺，同时结合杰出的专业知识和高级时装般工艺。 ',
                img:'/app/images/item-1.png'
            },{
                name:'刻字服务',
                desc:'法国娇兰将传统技艺和卓越工艺融入定制服务。每个周六，娇兰之家会举行私人雕刻创作班。经由个性化手工雕刻，您将拥有一瓶独特的娇兰香水瓶。个性化的香水瓶作为法国娇兰优雅的象征，在娇兰之家应运而生。',
                img:'/app/images/item-2.png'
            },
        ]


    };

    if (typeof define === 'function' && define.amd){
        // we have an AMD loader.
        define(function(){
            return controller;
        });
    }
    else {
        this.custom = custom;
    }

}).call(this);

$(document).ready(function(){

    var customStart = new custom();
    customStart.init();

});
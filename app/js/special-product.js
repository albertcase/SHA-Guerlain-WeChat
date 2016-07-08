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
            //self.presenvationDate();
            self.addProducts();
        },
        addProducts:function(){
            var self = this;
            var pjson = starProducts,
                listHtml = '';
            for(var i in starProducts){
                listHtml = listHtml+ '<li class="item-product item-product-'+i+'">'+
                    '<div class="product-image">'+
                    '<img src="'+starProducts[i].thumbnail+'" alt=""/>'+
                    '</div>'+
                    '<div class="product-name">'+starProducts[i].productname+'</div>'+
                '<div class="product-des">'+starProducts[i].productdes+'</div>'+
                '<div class="btn-details" id="'+i+'">了解更多</div>'+
                    '</li>';
            }
            $('.products-list').append(listHtml);


        },
        //bind all element event,such as click, touchstart
        bindEvent:function(){
            var self = this;

            //show details
            $('body').on('touchstart','.btn-details', function(){
                var id = $(this).attr('id');
                self.showProductDetails(id);
            });
            $('body').on('touchstart','.btn-close', function(){
                Common.popupBox.remove();
            });


        },
        showProductDetails:function(id){
            var json = starProducts;
            var productHtml = '';
            if(id==3 && json[id].productname == '手套'){
            //    手套
                productHtml = '<div class="product-summary">'+json[id].productintro+'</div>'+
                    (json[id].price?('<div class="product-price"> <span>'+json[id].price+'</span> </div>'):(''))+
                    '<div class="clearfix"></div>'+
                    (json[id].volume?('<div class="product-volume"><span>'+json[id].volume+'</span></div>'):(''));
            }else if(json[id].productname == '芳香折扇'){

                productHtml = '<div class="product-image"><img src="'+json[id].productimgsrc+'" alt=""/></div>'+
                    '<div class="product-summary">'+json[id].productintro+'</div>'+
                    (json[id].price?('<div class="product-price"> <span>'+json[id].price+'</span> </div>'):(''))+
                    '<div class="clearfix"></div>'+
                    (json[id].volume?('<div class="product-volume"><span>'+json[id].volume+'</span></div>'):(''))+
                    '<div class="product-image"><img src="'+json[id].productimgsrc2+'" alt=""/></div>'+
                    '<div class="product-summary">'+json[id].productintro2+'</div>'+
                    (json[id].price2?('<div class="product-price"> <span>'+json[id].price2+'</span> </div>'):(''))
                ;

            }else{
                productHtml = '<div class="product-image"><img src="'+json[id].productimgsrc+'" alt=""/></div>'+
                    '<div class="product-summary">'+json[id].productintro+'</div>'+
                    (json[id].price?('<div class="product-price"> <span>'+json[id].price+'</span> </div>'):(''))+
                    '<div class="clearfix"></div>'+
                    (json[id].volume?('<div class="product-volume"><span>'+json[id].volume+'</span></div>'):(''));
            }
            Common.popupBox.add(productHtml);
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
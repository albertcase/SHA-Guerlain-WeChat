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
        },
        //bind all element event,such as click, touchstart
        bindEvent:function(){
            var self = this;

            //show details
            $('.btn-details').on('touchstart', function(){
                self.showProductDetails(3);
            });
            $('body').on('touchstart','.btn-close', function(){
                Common.popupBox.remove();
            });


        },
        showProductDetails:function(id){
            var productHtml = '<div class="product-image"><img src="/app/images/product-1.png" alt=""/></div>'+
                '<p class="product-summary">Spiritueuse Double Vanille fait partie des Collections Exclusives, fragrances destinées aux passionnés de parfums rares, sensibles aux matières premières nobles et au raffinement de tous les détails. Les Collections Exclusives sont disponibles en France exclusivement dans les Boutiques parisiennes Guerlain, et désormais sur votre Boutique en ligne Guerlain.Le parfum s"habille d"un flacon aux lignes épurées et contemporaines, orné dune plaque de métal doré sur la tranche, comme un livre précieux. Il est magnifié par une élégante poire qui délivre, dans une brume délicate, les effluves inouïs. </p>'+
                '<div class="product-price"> <span>78,00 €</span> </div>'+
                '<div class="clearfix"></div>'+
                '<div class="product-volume"><span>Vaporisateur 75 ML</span></div>';
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
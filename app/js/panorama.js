(function(){var a=function(a){this.obj={ele:a,winWidth:$(window).width(),imgClientWidth:a.width(),minTranslateX:$(window).width()-a.width(),maxTranslateX:0,CurTranslateX:Math.floor($(window).width()/2-a.width()/2),middleTranslateX:Math.floor($(window).width()/2-a.width()/2),perX:10}};a.prototype={init:function(){var a=this;a.bindEvent(),a.centerImg(a.obj.ele),Common.overscroll(document.getElementById("wrapper")),a.touchTo();var n=setTimeout(function(){$(".tips").hide(1e3),clearTimeout(n)},3e3)},bindEvent:function(){Common.popupBox.add('<p class="pop-content">通过全景图感受娇兰香榭丽舍68号门店、中层楼、会所、Le 68餐厅的视觉体验，探索娇兰之家的奥秘。</p>',"panorama-pop")},centerImg:function(a){function n(a){r=a.gamma}var t=this;if(t.curImgTransform(t.obj.CurTranslateX),window.DeviceOrientationEvent){var o=0,r=0;window.addEventListener("deviceorientation",n,!1);var e=setTimeout(function(){window.removeEventListener("deviceorientation",n,!1),window.addEventListener("deviceorientation",function(a){o=a.gamma;var n=Math.floor(o-r);n=n>10?1:-10>n?-1:0,t.obj.CurTranslateX=t.obj.CurTranslateX+t.obj.perX*n,t.curImgTransform(t.obj.CurTranslateX)},!1),clearTimeout(e)},3e3)}else alert("Not supported.")},curImgTransform:function(){var a=this;a.obj.CurTranslateX<a.obj.minTranslateX?a.obj.CurTranslateX=a.obj.minTranslateX:a.obj.CurTranslateX>a.obj.maxTranslateX&&(a.obj.CurTranslateX=a.obj.maxTranslateX),this.obj.ele.css({"-webkit-transform":"translateX("+a.obj.CurTranslateX+"px)","-moz-transform":"translateX("+a.obj.CurTranslateX+"px)","-o-transform":"translateX("+a.obj.CurTranslateX+"px)",transform:"translateX("+a.obj.CurTranslateX+"px)"})},touchTo:function(a){var n=this,t=0,o=0,r=0;$("#panorama").on("touchstart",function(a){t=a.touches[0].clientX}),$("#panorama").on("touchmove",function(a){o=a.touches[0].clientX,r=Math.ceil(o-t),o>t?n.obj.CurTranslateX=n.obj.CurTranslateX+n.obj.perX:t>o&&(n.obj.CurTranslateX=n.obj.CurTranslateX-n.obj.perX),n.curImgTransform(n.obj.CurTranslateX)})}},"function"==typeof define&&define.amd?define(function(){return a}):this.panorama=a}).call(this),$(document).ready(function(){Common.queryString().id?$("#panorama img").attr("src","/app/images/panorama/panorama-"+Common.queryString().id+".jpg"):$("#panorama img").attr("src","/app/images/panorama/panorama-1.jpg"),$(".panorama img").on("load",function(){var a=$(".panorama img"),n=new panorama(a);n.init()})});